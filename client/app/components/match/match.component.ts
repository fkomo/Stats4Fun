import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Match, Matches } from '../../models/match';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerStats } from '../../models/playerStats';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-match',
	templateUrl: './match.component.html',
	styleUrls: ['./match.component.css']
})

export class MatchComponent extends BaseComponent {

	id: number;
	match: Match;
	matchPlayers: PlayerStats[] = [];
	mutualMatches: Matches;

	matchForm: FormGroup;
	editable: boolean;

	get formControls() { return this.matchForm.controls; }

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		protected apiService: ApiService,
		private formBuilder: FormBuilder) {
		super(apiService);

		this.id = 0;
		this.editable = false;

		this.matchForm = this.formBuilder.group({
			id: this.id,
			dateTime: [new Date().toISOString().slice(0, 16), Validators.required],
			homeTeamScore: [0, Validators.required],
			awayTeamScore: [0, Validators.required],
			homeTeamId: [0, this.comboBoxValidator],
			awayTeamId: [0, this.comboBoxValidator],
			matchTypeId: [0, this.comboBoxValidator],
			placeId: [0, this.comboBoxValidator],
			competitionId: [0, this.comboBoxValidator],
			players: this.formBuilder.array([]),
		});

		this.enableForm(false);

		route.params.subscribe(val => {
			this.ngOnInit();
		});
	}

	ngOnInit(): void {
		console.log('TODO BUG ngOnInit is called twice');

		super.ngOnInit();
		this.getMatchFromUrl();
	}

	enableForm(enable: boolean) {
		var playersForm = this.matchForm.get('players') as FormArray;
		for (var i = 0; i < playersForm.length; i++) {
			if (enable)
				playersForm.at(i).enable();
			else
				playersForm.at(i).disable();
		}

		if (enable)
			this.matchForm.enable();
		else
			this.matchForm.disable();

		this.editable = enable;
	}

	isInvalid(control: AbstractControl): boolean {
		return control.invalid && (control.dirty || control.touched || this.editable);
	}

	private getMatchFromUrl() {
		const id = +this.route.snapshot.paramMap.get('id');
		if (id == 0) {
			this.enableForm(true);
			return;
		}

		this.apiService.getMatch(id)
			.subscribe(match => {
				this.match = match;
				this.loadMatch(this.match);
			});
	}

	private loadMatch(match: Match) {
		if (match != null && match.id != null) {
			this.matchForm.patchValue({
				id: match.id,
				dateTime: match.dateTime.toISOString().slice(0, 16),
				homeTeamId: match.homeTeamId,
				awayTeamId: match.awayTeamId,
				homeTeamScore: match.homeTeamScore,
				awayTeamScore: match.awayTeamScore,
				placeId: match.placeId,
				matchTypeId: match.matchTypeId,
				competitionId: match.competitionId,
			});
			this.id = match.id;

			(this.matchForm.get('players') as FormArray).clear();
			match.players.forEach(p => {
				var playersFormGroup = this.createPlayerFormGroup(p);
				playersFormGroup.disable();
				(this.matchForm.get('players') as FormArray).push(playersFormGroup);
			});

			let opponentTeamId = this.getOpponentTeamId(match);
			this.apiService.listMutualMatches(
				opponentTeamId == match.homeTeamId ? match.awayTeamId : match.homeTeamId,
				opponentTeamId)
				.subscribe(i => this.mutualMatches = i);
		}
		else
			this.router.navigate(['../matches']);
	}

	private getOpponentTeamId(match: Match): number {
		if (this.getEnum('teams', match.homeTeamId).name.startsWith('4Fun'))
			return match.awayTeamId;

		return match.homeTeamId;
	}

	private createPlayerFormGroup(player: PlayerStats): FormGroup {
		return this.formBuilder.group({
			playerStatsId: player != null ? player.playerStatsId : 0,
			playerId: player != null ? player.playerId : [0, this.comboBoxValidator],
			matchId: player != null ? player.matchId : 0,
			goals: player != null ? player.goals : [0, Validators.required],
			assists: player != null ? player.assists : [0, Validators.required],
			posNegPoints: player != null ? player.posNegPoints : [0, Validators.required],
			yellowCards: player != null ? player.yellowCards : [0, Validators.required],
			redCards: player != null ? player.redCards : [0, Validators.required],
		});
	}

	saveMatch() {
		if (!this.matchForm.valid)
			return;

		var match: Match = {
			id: this.matchForm.get('id').value,
			dateTime: this.matchForm.get('dateTime').value,
			homeTeamId: this.matchForm.get('homeTeamId').value,
			awayTeamId: this.matchForm.get('awayTeamId').value,
			homeTeamScore: this.matchForm.get('homeTeamScore').value,
			awayTeamScore: this.matchForm.get('awayTeamScore').value,
			placeId: this.matchForm.get('placeId').value,
			matchTypeId: this.matchForm.get('matchTypeId').value,
			competitionId: this.matchForm.get('competitionId').value,
			players: []
		};

		var players = this.matchForm.get('players') as FormArray;
		for (var i = 0; i < players.length; i++) {
			var player = players.at(i);
			if (player.get('playerId').value < 1)
				continue;

			match.players.push({
				playerStatsId: player.get('playerStatsId').value,
				playerId: player.get('playerId').value,
				matchId: this.matchForm.get('id').value,
				goals: player.get('goals').value,
				assists: player.get('assists').value,
				posNegPoints: player.get('posNegPoints').value,
				yellowCards: player.get('yellowCards').value,
				redCards: player.get('redCards').value,
			} as PlayerStats);
		}

		this.apiService.saveMatch(match).subscribe(
			match => {
				this.enableForm(false);
				if (this.id == 0)
					this.router.navigate(['./match/' + match.id]);
				else {
					this.match = match;
					this.loadMatch(this.match);
				}
			});
	}

	editMatch() {
		this.enableForm(true);
	}

	deleteMatch() {
		if (confirm(`Delete match ?`)) {
			this.apiService.deleteMatch(this.matchForm.get('id').value)
				.subscribe(result => this.router.navigate(['../matches']));
		}
	}

	undoChanges() {
		this.enableForm(false);
		this.getMatchFromUrl();
	}

	addPlayer() {
		(this.matchForm.get('players') as FormArray).push(this.createPlayerFormGroup(null));
	}

	removePlayer(id: number) {
		(this.matchForm.get('players') as FormArray).removeAt(id);
	}

	isKontumacia(): boolean {
		return this.match.players.length == 0 && 
			((this.match.homeTeamScore == 0 && this.match.awayTeamScore == 5) ||
			(this.match.homeTeamScore == 5 && this.match.awayTeamScore == 0));
	}
}
