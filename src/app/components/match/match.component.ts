import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Match } from '../../models/match';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerMatchStats } from '../../models/playerMatchStats';
import { TeamStats } from '../../models/teamStats';
import { BaseComponent } from '../base/base.component';
import { PlayerStats } from '../../models/playerStats';

@Component({
	selector: 'app-match',
	templateUrl: './match.component.html',
	styleUrls: ['./match.component.css']
})

export class MatchComponent extends BaseComponent {

	id: number;
	matchPlayers: PlayerStats[];
	mutualMatches: Match[];
	mutualTeamStats: TeamStats;

	matchForm: FormGroup;
	editable: boolean;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		protected apiService: ApiService,
		private formBuilder: FormBuilder) {
		super(apiService);

		this.editable = false;

		this.id = 0;
		this.matchForm = this.formBuilder.group({
			id: this.id,
			dateTime: [new Date().toISOString().slice(0, 16),
			Validators.required],
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
	}

	private createPlayerFormGroup(player: PlayerMatchStats): FormGroup {
		return this.formBuilder.group({
			id: player != null ? player.id : 0,
			playerId: player != null ? player.playerId : [0, this.comboBoxValidator],
			matchId: player != null ? player.matchId : 0,
			goals: player != null ? player.goals : [0, Validators.required],
			assists: player != null ? player.assists : [0, Validators.required],
			posNegPoints: player != null ? player.posNegPoints : [0, Validators.required],
			yellowCards: player != null ? player.yellowCards : [0, Validators.required],
			redCards: player != null ? player.redCards : [0, Validators.required],
		});
	}

	private getMatchFromUrl(): Match {
		const id = +this.route.snapshot.paramMap.get('id');
		if (id == 0)
			return null;

		// get match from api
		var match = this.apiService.getMatch(id);
		this.matchPlayers = [];

		if (match != null) {

			// create form
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

			match.players.forEach(p => {
				var playersFormGroup = this.createPlayerFormGroup(p);
				playersFormGroup.disable();
				(this.matchForm.get('players') as FormArray).push(playersFormGroup);
			});

			this.apiService.listMatchPlayers(match.id)
				.subscribe(i => this.matchPlayers = i);

			this.apiService.listMutualMatches(match.homeTeamId, match.awayTeamId)
				.subscribe(i => this.mutualMatches = i);
			this.apiService.getMutualStats(match.homeTeamId, match.awayTeamId)
				.subscribe(i => this.mutualTeamStats = i);
		}

		return match;
	}

	ngOnInit(): void {
		super.ngOnInit();

		if (!this.getMatchFromUrl())
			this.enableForm(true);
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

	saveMatch() {
		if (!this.matchForm.valid)
			return;

		var match = {
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
		} as Match;

		var players = this.matchForm.get('players') as FormArray;
		for (var i = 0; i < players.length; i++) {
			var player = players.at(i);
			if (player.get('playerId').value < 1)
				continue;

			match.players.push({
				id: player.get('id').value,
				playerId: player.get('playerId').value,
				matchId: this.matchForm.get('id').value,
				goals: player.get('goals').value,
				assists: player.get('assists').value,
				posNegPoints: player.get('posNegPoints').value,
				yellowCards: player.get('yellowCards').value,
				redCards: player.get('redCards').value,
			} as PlayerMatchStats);
		}

		var savedMatch = this.apiService.saveMatch(match);
		if (savedMatch != null)
			this.router.navigate(['../match/' + savedMatch.id]);
	}

	editMatch() {
		this.enableForm(true);
	}

	deleteMatch() {
		if (this.apiService.deleteMatch(this.matchForm.get('id').value)) {
			this.matchForm.reset();
			this.router.navigate(['../matches']);
		}
	}

	addPlayer() {
		(this.matchForm.get('players') as FormArray).push(this.createPlayerFormGroup(null));
	}

	removePlayer(id: number) {
		(this.matchForm.get('players') as FormArray).removeAt(id);
	}

	undoChanges() {
		this.router.navigate(['../match/' + this.id]);
	}

	get formControls() { return this.matchForm.controls; }

	isInvalid(control: AbstractControl): boolean {
		return control.invalid && (control.dirty || control.touched || this.editable);
	}
}
