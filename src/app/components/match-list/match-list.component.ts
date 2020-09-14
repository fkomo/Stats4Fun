import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../models/match';
import { ApiService } from '../../services/api.service';
import { BaseComponent } from '../base/base.component';
import { TeamStats } from '../../models/teamStats';

@Component({
	selector: 'app-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.css']
})

export class MatchListComponent extends BaseComponent {

	@Input() matches: Match[];
	@Input() teamStats: TeamStats;

	goalsForPercentage: number;
	goalsAgainstPercentage: number;

	columns = {};
	selectedColumn: string;

	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		if (this.teamStats != null) {
			this.goalsForPercentage = 50.0 * this.teamStats.goalsFor / (this.teamStats.goalsFor + this.teamStats.goalsAgainst);
			this.goalsAgainstPercentage = 50.0 * this.teamStats.goalsAgainst / (this.teamStats.goalsFor + this.teamStats.goalsAgainst);
		}

		this.selectedColumn = 'dateTime';
		this.sort(this.selectedColumn);
	}

	sort(columnName: string) {

		this.selectedColumn = columnName;

		// save column sort direction
		var old = this.columns[columnName];
		if (old == null)
			this.columns[columnName] = true;
		else
			this.columns[columnName] = !old;

		this.matches = this.matches.sort((i1, i2) => {
			var order = this.columns[columnName] ? -1 : 1;
			switch (columnName) {
				case "dateTime":
					return order * ((i1.dateTime > i2.dateTime) ? 1 : (i1.dateTime < i2.dateTime) ? -1 : 0);
				case "place":
					return order * ((i1.placeId > i2.placeId) ? 1 : (i1.placeId < i2.placeId) ? -1 : 0);
				case "matchType":
					return order * ((i1.matchTypeId > i2.matchTypeId) ? 1 : (i1.matchTypeId < i2.matchTypeId) ? -1 : 0);
				case "competition":
					return order * ((i1.competitionId > i2.competitionId) ? 1 : (i1.competitionId < i2.competitionId) ? -1 : 0);
				case "homeTeam":
					return order * ((i1.homeTeamId > i2.homeTeamId) ? 1 : (i1.homeTeamId < i2.homeTeamId) ? -1 : 0);
				case "homeTeamScore":
					return order * ((i1.homeTeamScore > i2.homeTeamScore) ? 1 : (i1.homeTeamScore < i2.homeTeamScore) ? -1 : 0);
				case "awayTeamScore":
					return order * ((i1.awayTeamScore > i2.awayTeamScore) ? 1 : (i1.awayTeamScore < i2.awayTeamScore) ? -1 : 0);
				case "awayTeam":
					return order * ((i1.awayTeamId > i2.awayTeamId) ? 1 : (i1.awayTeamId < i2.awayTeamId) ? -1 : 0);
				default:
					return 0;
			}
		});
	}

	getMatchColor(match: Match): string {
		if (match.homeTeamScore > match.awayTeamScore)
			return "color8";
		else if (match.homeTeamScore < match.awayTeamScore)
			return "color9";
		else
			return "color0";
	}
}
