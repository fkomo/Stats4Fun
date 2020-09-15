import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Match } from '../../models/match';
import { BaseComponent } from '../base/base.component';
import { PlayerMatchStats } from '../../models/playerMatchStats';
import { BestScore } from '../../models/bestScore';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})

export class PlayerComponent extends BaseComponent {

	id: number;
	playerMatches: Match[];
	stats: PlayerMatchStats[];
	bestScores: BestScore[] = [];

	playerForm: FormGroup;
	editable: boolean;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		protected apiService: ApiService,
		private formBuilder: FormBuilder) {
		super(apiService);

		this.id = 0;
		this.editable = false;

		this.playerForm = this.formBuilder.group({
			id: this.id,
			name: ['', [
				Validators.maxLength(50),
				Validators.minLength(1),
				Validators.required]],
			dateOfBirth: [new Date().toISOString().slice(0, 10),
			Validators.required],
			number: '',
			teamId: [0, this.comboBoxValidator],
			playerPositionId: [0, this.comboBoxValidator],
			retired: false,
		});

		this.enableForm(false);
	}

	ngOnInit(): void {
		super.ngOnInit();

		if (!this.getPlayerFromUrl())
			this.enableForm(true);
	}

	private getPlayerFromUrl(): Player {
		const id = +this.route.snapshot.paramMap.get('id');
		if (id == 0)
			return null;

		// get match from api
		var player = this.apiService.getPlayer(id);
		if (player != null) {
			// create form
			this.playerForm.patchValue({
				id: player.id,
				name: player.name,
				dateOfBirth: player.dateOfBirth.toISOString().slice(0, 10),
				number: player.number,
				teamId: player.teamId,
				playerPositionId: player.playerPositionId,
				retired: player.retired,
			});
			this.id = player.id;

			console.log(player.dateOfBirth.toISOString());

			this.apiService.listPlayerMatches(player.id)
				.subscribe(i => {
					this.playerMatches = i;

					this.apiService.listPlayerMatchesStats(player.id)
						.subscribe(i2 => {
							this.stats = i2;

							this.bestScores = [];

							var mostGoals = this.stats.reduce(function (a, b) {
								return a.goals > b.goals ? a : b
							});
							this.bestScores.push({
								score: mostGoals.goals,
								scoreType: 'goals',
								matchId: mostGoals.matchId,
								opponentTeamId: this.playerMatches.find(m => m.id == mostGoals.matchId).awayTeamId,
							});

							var mostAssists = this.stats.reduce(function (a, b) {
								return a.assists > b.assists ? a : b
							});
							this.bestScores.push({
								score: mostAssists.assists,
								scoreType: 'assists',
								matchId: mostAssists.matchId,
								opponentTeamId: this.playerMatches.find(m => m.id == mostAssists.matchId).awayTeamId,
							});

							var mostPoints = this.stats.reduce(function (a, b) {
								return a.posNegPoints > b.posNegPoints ? a : b
							});
							this.bestScores.push({
								score: mostPoints.posNegPoints,
								scoreType: '+/- points',
								matchId: mostPoints.matchId,
								opponentTeamId: this.playerMatches.find(m => m.id == mostPoints.matchId).awayTeamId,
							});

							// var leastPoints = this.stats.reduce(function (a, b) {
							// 	return a.posNegPoints < b.posNegPoints ? a : b
							// });
							// this.bestScores.push({
							// 	score: leastPoints.posNegPoints,
							// 	scoreType: '+/- points',
							// 	matchId: leastPoints.matchId,
							// 	opponentTeamId: this.playerMatches.find(m => m.id == leastPoints.matchId).awayTeamId,
							// });
						});
				});

		}

		return player;
	}

	savePlayer() {
		if (!this.playerForm.valid)
			return;

		var player: Player = {
			id: this.playerForm.get('id').value,
			name: this.playerForm.get('name').value,
			dateOfBirth: this.playerForm.get('dateOfBirth').value,
			number: this.playerForm.get('number').value,
			teamId: this.playerForm.get('teamId').value,
			playerPositionId: this.playerForm.get('playerPositionId').value,
			retired: this.playerForm.get('retired').value,
		};

		var savedPlayer = this.apiService.savePlayer(player);
		if (savedPlayer != null)
			this.router.navigate(['../player/' + savedPlayer.id]);
	}

	enableForm(enable: boolean) {

		if (enable)
			this.playerForm.enable();
		else
			this.playerForm.disable();

		this.editable = enable;
	}

	editPlayer() {
		this.enableForm(true);
	}

	deletePlayer() {
		if (this.apiService.deletePlayer(this.playerForm.get('id').value))
			this.router.navigate(['../players']);
	}

	undoChanges() {
		this.router.navigate(['../player/' + this.id]);
	}

	getPlayerAge(dateOfBirth: Date): number {
		var timeDiff = Math.abs(Date.now() - new Date(dateOfBirth).getTime());
		return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
	}

	get formControls() { return this.playerForm.controls; }

	isInvalid(control: AbstractControl): boolean {
		return control.invalid && (control.dirty || control.touched || this.editable);
	}
}
