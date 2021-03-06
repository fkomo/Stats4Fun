import { Component, OnInit } from '@angular/core';
import { Match, Matches } from '../../models/match';
import { ApiService } from '../../services/api.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-matches',
	templateUrl: './matches.component.html',
	styleUrls: ['./matches.component.css']
})

export class MatchesComponent extends BaseComponent {

	matches: Matches;

	// filters
	seasonId: number;
	teamId: number;
	matchTypeId: number;
	placeId: number;
	matchResultId: number;
	competitionId: number;

	avgMatchPlayers: number = 0;

	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.seasonId = this.getNumberFromStorage('seasonId');
		this.teamId = this.getNumberFromStorage('teamId');
		this.matchTypeId = this.getNumberFromStorage('matchTypeId');
		this.placeId = this.getNumberFromStorage('placeId');
		this.matchResultId = this.getNumberFromStorage('matchResultId');
		this.competitionId = this.getNumberFromStorage('competitionId');

		this.filter();
	}

	filter() {

		this.setStorage('seasonId', this.seasonId);
		this.setStorage('teamId', this.teamId);
		this.setStorage('matchTypeId', this.matchTypeId);
		this.setStorage('placeId', this.placeId);
		this.setStorage('matchResultId', this.matchResultId);
		this.setStorage('competitionId', this.competitionId);

		this.apiService.listMatches(
			this.seasonId,
			this.teamId,
			this.matchTypeId,
			this.placeId,
			this.matchResultId,
			this.competitionId)
			.subscribe(i => {
				this.matches = i;
				this.getPlayerMatchAvg();
			});
	}

	getPlayerMatchAvg() {
		this.avgMatchPlayers = 0;
		this.apiService.listPlayerStats(this.seasonId, this.matchTypeId, this.competitionId, this.teamId,
			null, null).subscribe(players => {
				this.avgMatchPlayers = Math.floor(players.
					reduce(function (sum, p) { return sum + p.gamesPlayed }, 0) / this.matches.gamesPlayed);
			});
	}
}
