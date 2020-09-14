import { Component, OnInit } from '@angular/core';
import { Match } from '../match';
import { ApiService } from '../api.service';
import { TeamStats } from '../teamStats';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-matches',
	templateUrl: './matches.component.html',
	styleUrls: ['./matches.component.css']
})

export class MatchesComponent extends BaseComponent {

	matches: Match[];
	teamStats: TeamStats;

	// filters
	seasonId: number;
	teamId: number;
	matchTypeId: number;
	placeId: number;
	matchResultId: number;
	competitionId: number;

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
			.subscribe(i => this.matches = i);

		this.apiService.getTeamStats(
			this.seasonId,
			this.teamId,
			this.matchTypeId,
			this.placeId,
			this.matchResultId,
			this.competitionId)
			.subscribe(i => this.teamStats = i);;
	}
}
