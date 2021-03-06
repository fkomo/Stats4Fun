import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { reduce } from 'rxjs/operators';
import { Match, Matches } from '../../models/match';
import { ApiService } from '../../services/api.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.css']
})

export class MatchListComponent extends BaseComponent {

	@Input() matches: Matches;

	goalsForPercentage: number;
	goalsAgainstPercentage: number;

	columns = {};
	selectedColumn: string;

	public goalsChartType: ChartType = 'doughnut';
	public goalsChartLegend = true;
	public goalsChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [{
				display: false,
			}],
			yAxes: [{
				display: false,
			}]
		},
		legend: {
			display: true,
			position: "bottom",
			align: "center",
		},
		rotation: 1 * Math.PI,
		circumference: 1 * Math.PI
	};
	public goalsChartLabels: Label[] = [' Strelené góly', ' Inkasované góly'];
	public goalsChartData: ChartDataSets[] = [];

	public resultsChartType: ChartType = 'doughnut';
	public resultsChartLegend = true;
	public resultsChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [{
				display: false,
			}],
			yAxes: [{
				display: false,
			}]
		},
		legend: {
			display: true,
			position: "bottom",
			align: "center",
		},
		rotation: 1 * Math.PI,
		circumference: 1 * Math.PI
	};
	public resultsChartLabels: Label[] = [' Výhry', ' Remízy', ' Prehry'];
	public resultsChartData: ChartDataSets[] = [];


	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		if (this.matches != null) {
			this.createChartData();

			this.goalsForPercentage = 50.0 * this.matches.goalsFor / (this.matches.goalsFor + this.matches.goalsAgainst);
			this.goalsAgainstPercentage = 50.0 * this.matches.goalsAgainst / (this.matches.goalsFor + this.matches.goalsAgainst);
		}

		this.selectedColumn = 'dateTime';
		this.sort(this.selectedColumn);
	}

	createChartData() {
		this.goalsChartData = [];

		if (this.matches == null)
			return;

		this.goalsChartData = [{
			data: [
				this.matches.goalsFor,
				this.matches.goalsAgainst
			],
			borderColor: '#1e1e1e',
			borderWidth: 4,
		}];

		this.resultsChartData = [{
			data: [
				this.matches.wins,
				this.matches.ties,
				this.matches.losses,
			],
			backgroundColor: [ "#1fcb22b3", "#808080b3", "#e21f1fb3"],
			
			borderColor: '#1e1e1e',
			borderWidth: 4,
		}];
	}

	sort(columnName: string) {
		if (this.matches == null)
			return;

		this.selectedColumn = columnName;

		// save column sort direction
		var old = this.columns[columnName];
		if (old == null)
			this.columns[columnName] = true;
		else
			this.columns[columnName] = !old;

		this.matches.matches = this.matches.matches.sort((i1, i2) => {
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

		var homeTeam = this.getEnum('teams', match.homeTeamId).name;
		var awayTeam = this.getEnum('teams', match.awayTeamId).name;

		if (match.homeTeamScore == match.awayTeamScore)
			return "color0";
		else if ((homeTeam.startsWith('4Fun') && match.homeTeamScore > match.awayTeamScore) ||
			(awayTeam.startsWith('4Fun') && match.homeTeamScore < match.awayTeamScore))
			return "color8";
		else
			return "color9";
	}
}
