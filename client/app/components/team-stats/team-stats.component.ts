import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Matches } from '../../models/match';
import { TeamStats } from '../../models/teamStats';
import { ApiService } from '../../services/api.service';
import { Label } from 'ng2-charts';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-stats',
	templateUrl: './team-stats.component.html',
	styleUrls: ['./team-stats.component.css']
})

export class TeamStatsComponent extends BaseComponent {

	avgMatchPlayers: number;
	teamStats: TeamStats[];
	selectedTeam: number = 0;

	mostGoalsScored: Matches;
	mostGoalsTaken: Matches;
	bestScoreDiff: Matches;
	worstScoreDiff: Matches;

	public seasonsChartLabels: Label[] = [];

	public resultsChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: true,
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: true
				}
			}],
			yAxes: [{
				gridLines: {
					display: false
				},
				stacked: true
			}]
		},
	};
	public resultsChartType: ChartType = 'line';
	public resultsChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	public scoreChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: true,
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: true
				}
			}],
			yAxes: [{
				gridLines: {
					display: false,
				},
				stacked: false
			}]
		},
	};
	public scoreChartType: ChartType = 'bar';
	public scoreChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	public cardsChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: true,
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: true
				}
			}],
			yAxes: [{
				gridLines: {
					display: false,
				},
				ticks: {
					stepSize: 1,
				},
				stacked: false
			}]
		},
	};
	public cardsChartType: ChartType = 'line';
	public cardsChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	constructor(
		private router: Router,
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.selectedTeam = this.getNumberFromStorage('selectedTeam', 0);

		this.changeTeam(this.selectedTeam);
	}

	private createResultsChartData() {
		this.resultsChartDataSets = [];

		this.resultsChartDataSets.push({
			label: ' Remízy',
			data: this.teamStats.map(season => { return season.ties; }),
			lineTension: 0,
			stack: 'result',
			// backgroundColor: '#808080e6',
			// borderColor: '#808080b3',
		});
		this.resultsChartDataSets.push({
			label: ' Prehry',
			data: this.teamStats.map(season => { return season.losses; }),
			lineTension: 0,
			stack: 'result',
			// backgroundColor: '#e21f1f88',
			// borderColor: '#e21f1fbb',
		});
		this.resultsChartDataSets.push({
			label: ' Víťazstvá',
			data: this.teamStats.map(season => { return season.wins; }),
			lineTension: 0,
			stack: 'result',
			// backgroundColor: '#1fcb2288',
			// borderColor: '#1fcb22bb',
		});
	}

	private createScoreChartData() {
		this.scoreChartDataSets = [];

		this.scoreChartDataSets.push({
			label: ' Strelené góly',
			data: this.teamStats.map(season => { return season.goalsFor; }),
			lineTension: 0,
			stack: 'score',
			// backgroundColor: '#1fcb2288',
			// borderColor: '#1fcb22bb',
		});
		this.scoreChartDataSets.push({
			label: ' Inkasované góly',
			data: this.teamStats.map(season => { return -season.goalsAgainst; }),
			lineTension: 0,
			stack: 'score',
			// backgroundColor: '#e21f1f88',
			// borderColor: '#e21f1fbb',
		});
	}

	private createCardsChartData() {
		this.cardsChartDataSets = [];

		this.cardsChartDataSets.push({
			label: ' Žlté karty',
			data: this.teamStats.map(season => { return season.yellowCards; }),
			lineTension: 0,
		});
		this.cardsChartDataSets.push({
			label: ' Červené karty',
			data: this.teamStats.map(season => { return season.redCards; }),
			lineTension: 0,
		});
	}

	changeTeam(teamId: number) {
		this.selectedTeam = teamId;
		this.setStorage('selectedTeam', this.selectedTeam);

		this.mostGoalsScored = null;
		this.mostGoalsTaken = null;
		this.bestScoreDiff = null;
		this.worstScoreDiff = null;

		this.apiService.listTeamStats(this.selectedTeam).subscribe(
			teamStats => {
				this.teamStats = teamStats;
				this.teamStats = this.teamStats.sort((i1, i2) => { return ((i1.seasonId > i2.seasonId) ? 1 : (i1.seasonId < i2.seasonId) ? -1 : 0); });
				this.seasonsChartLabels = this.teamStats.map(season => { return `${season.seasonId}/${season.seasonId + 1}`; });

				this.createResultsChartData();
				this.createScoreChartData();
				//this.createCardsChartData();
			});

		// TODO sort matches by respective order
		this.apiService.listBestWorstMatches(this.selectedTeam).subscribe(
			matches => {
				this.mostGoalsScored = {
					opponentTeamId: null,
					gamesPlayed: matches.mostGoalsScored.length,
					goalsFor: null,
					goalsAgainst: null,
					wins: null,
					losses: null,
					ties: null,
					matches: matches.mostGoalsScored,
				};

				this.mostGoalsTaken = {
					opponentTeamId: null,
					gamesPlayed: matches.mostGoalsTaken.length,
					goalsFor: null,
					goalsAgainst: null,
					wins: null,
					losses: null,
					ties: null,
					matches: matches.mostGoalsTaken,
				};

				this.bestScoreDiff = {
					opponentTeamId: null,
					gamesPlayed: matches.bestScoreDiff.length,
					goalsFor: null,
					goalsAgainst: null,
					wins: null,
					losses: null,
					ties: null,
					matches: matches.bestScoreDiff,
				};

				this.worstScoreDiff = {
					opponentTeamId: null,
					gamesPlayed: matches.worstScoreDiff.length,
					goalsFor: null,
					goalsAgainst: null,
					wins: null,
					losses: null,
					ties: null,
					matches: matches.worstScoreDiff,
				};
			});
	}
}
