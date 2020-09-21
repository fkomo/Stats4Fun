import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Match, Matches } from '../../models/match';
import { BaseComponent } from '../base/base.component';
import { PlayerStats } from '../../models/playerStats';
import { BestScore } from '../../models/bestScore';
import { Enum } from 'src/app/models/enum';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})

export class PlayerComponent extends BaseComponent {

	id: number;
	playerMatches: Matches;
	stats: PlayerStats[] = [];
	bestScores: BestScore[] = [];
	playerSeasons: Enum[] = [];

	seasonId: number;

	playerForm: FormGroup;
	editable: boolean;

	get formControls() { return this.playerForm.controls; }

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		protected apiService: ApiService,
		private formBuilder: FormBuilder) {
		super(apiService);

		this.id = 0;
		this.editable = false;
		this.seasonId = 0;

		this.playerForm = this.formBuilder.group({
			playerId: this.id,
			name: ['', [
				Validators.maxLength(50),
				Validators.minLength(1),
				Validators.required]],
			dateOfBirth: [new Date().toISOString().slice(0, 10), Validators.required],
			number: '',
			teamId: [0, this.comboBoxValidator],
			playerPositionId: [0, this.comboBoxValidator],
			retired: false,
		});

		this.enableForm(false);

		route.params.subscribe(val => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.getPlayerFromUrl();
	}

	enableForm(enable: boolean) {

		if (enable)
			this.playerForm.enable();
		else
			this.playerForm.disable();

		this.editable = enable;
	}

	isInvalid(control: AbstractControl): boolean {
		return control.invalid && (control.dirty || control.touched || this.editable);
	}

	private getPlayerFromUrl() {
		const id = +this.route.snapshot.paramMap.get('id');
		if (id == 0) {
			this.enableForm(true);
			return;
		}

		this.apiService.getPlayer(id).subscribe(player => this.loadPlayer(player));
	}

	private loadPlayer(player: Player) {
		if (player != null && player.playerId != null) {
			this.playerForm.patchValue({
				playerId: player.playerId,
				name: player.name,
				dateOfBirth: player.dateOfBirth == null ? null : player.dateOfBirth.toISOString().slice(0, 10),
				number: player.number,
				teamId: player.teamId,
				playerPositionId: player.playerPositionId,
				retired: player.retired,
			});
			this.id = player.playerId;

			this.listPlayerSeasons();
		}
		else
			this.router.navigate(['../players']);
	}

	listPlayerSeasons() {
		this.apiService.listPlayerSeasons(this.id)
			.subscribe(seasons => {
				this.playerSeasons = seasons;
				if (seasons.length > 0) {
					this.seasonId = seasons[0].id;
					this.getSeasonStats(this.seasonId);
				}
			});
	}

	getSeasonStats(seasonId: number) {
		if (seasonId == 0)
			return;

		this.stats = [];
		this.playerMatches = null;
		this.seasonId = seasonId;

		this.apiService.listPlayerMatches(this.id, this.seasonId)
			.subscribe(i => {
				this.playerMatches = i;
				if (this.playerMatches.gamesPlayed > 0) {
					this.apiService.listPlayerMatchesStats(this.id, this.seasonId).subscribe(i2 => {
						this.stats = i2;

						this.bestScores = [];

						var mostGoals = this.stats.reduce(function (a, b) {
							return a.goals > b.goals ? a : b
						});
						if (mostGoals != null && mostGoals.goals > 0) {
							this.bestScores.push({
								score: mostGoals.goals,
								scoreType: this.getStringMutation(mostGoals.goals, 'gól', 'góly', 'gólov'),
								matchId: mostGoals.matchId,
								opponentTeamId: this.getOpponentTeamId(mostGoals.matchId),
							});
						}

						var mostAssists = this.stats.reduce(function (a, b) {
							return a.assists > b.assists ? a : b
						});
						if (mostAssists != null && mostAssists.assists > 0) {
							this.bestScores.push({
								score: mostAssists.assists,
								scoreType: this.getStringMutation(mostAssists.assists, 'asistencia', 'asistencie', 'asistencií'),
								matchId: mostAssists.matchId,
								opponentTeamId: this.getOpponentTeamId(mostAssists.matchId),
							});
						}

						var mostPoints = this.stats.reduce(function (a, b) {
							return a.posNegPoints > b.posNegPoints ? a : b
						});
						if (mostPoints != null && mostPoints.posNegPoints > 0) {
							this.bestScores.push({
								score: mostPoints.posNegPoints,
								scoreType: '+/- ' + this.getStringMutation(mostPoints.posNegPoints, 'bod', 'body', 'bodov'),
								matchId: mostPoints.matchId,
								opponentTeamId: this.getOpponentTeamId(mostPoints.matchId),
							});
						}
					});
				}
			});
	}

	savePlayer() {
		if (!this.playerForm.valid)
			return;

		var player: Player = {
			playerId: this.playerForm.get('playerId').value,
			name: this.playerForm.get('name').value,
			dateOfBirth: this.playerForm.get('dateOfBirth').value,
			number: this.playerForm.get('number').value == "" ? null : this.playerForm.get('number').value,
			teamId: this.playerForm.get('teamId').value,
			playerPositionId: this.playerForm.get('playerPositionId').value,
			retired: this.playerForm.get('retired').value,
		};

		this.apiService.savePlayer(player).subscribe(
			player => {
				this.enableForm(false);
				if (this.id == 0)
					this.router.navigate(['./player/' + player.playerId]);
				else
					this.loadPlayer(player);
			});
	}

	editPlayer() {
		this.enableForm(true);
	}

	deletePlayer() {
		if (confirm(`Delete '${this.playerForm.get('name').value}' ?`)) {
			this.apiService.deletePlayer(this.playerForm.get('playerId').value)
				.subscribe(result => this.router.navigate(['../players']));
		}
	}

	undoChanges() {
		this.enableForm(false);
		this.getPlayerFromUrl();
	}

	getPlayerAge(dateOfBirth: Date): number {
		if (dateOfBirth == null)
			return null;
		var timeDiff = Math.abs(Date.now() - new Date(dateOfBirth).getTime());
		return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
	}

	getOpponentTeamId(matchId: number): number {
		var match = this.playerMatches.matches.find(m => m.id == matchId);
		if (this.getEnum('teams', match.homeTeamId).name.startsWith('4Fun'))
			return match.awayTeamId;

		return match.homeTeamId;
	}
}
