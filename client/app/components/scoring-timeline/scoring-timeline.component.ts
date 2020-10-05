import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Match, Matches } from '../../models/match';
import { BaseComponent } from '../base/base.component';
import { ApiService } from '../../services/api.service';
import { PlayerStats } from '../../models/playerStats';
import { Router } from '@angular/router';

@Component({
	selector: 'app-scoring-timeline',
	templateUrl: './scoring-timeline.component.html',
	styleUrls: ['./scoring-timeline.component.css']
})

export class ScoringTimelineComponent extends BaseComponent {

	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [{
				display: false,
				ticks: {
					display: false,
				}
			}],
			yAxes: [{
				ticks: {
					stepSize: 1
				}
			}]
		},
	};
	public barChartLabels: Label[] = [];
	public barChartData: ChartDataSets[] = [];

	public radarChartOptions: RadialChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				display: false,
				ticks: {
					display: false,
				}
			}],
			yAxes: [{
				display: false,
				ticks: {
					stepSize: 1,
				}
			}],

		},
		scale: {
			ticks: {
				display: false,
				maxTicksLimit: 10,
			}
		},
	};
	public radarChartLabels: Label[] = [
		'Góly',
		'Asistencie',
		'+/- Body',
		'Žlté Karty',
		'Červené karty'
	];
	public radarChartData: ChartDataSets[] = [];
	public radarChartType: ChartType = 'radar';

	@Input() stats: PlayerStats[];
	@Input() matches: Matches;

	constructor(
		private router: Router,
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.createChartData();
	}

	matchClicked(e: any) {

		if (e.active.length > 0) {
			const chart = e.active[0]._chart;
			const activePoints = chart.getElementAtEvent(e.event);
			if (activePoints.length > 0) {
				const clickedElementIndex = activePoints[0]._index;
			
				this.router.navigate([`../match/${ this.matches.matches[clickedElementIndex].id }`]);
			}
		}
	}

	createChartData() {

		this.barChartLabels = [];
		this.barChartData = [];
		if (this.matches.gamesPlayed < 1 || this.stats.length < 1)
			return;

		var goals: ChartDataSets = {
			data: [], label: ' Góly', stack: 'a'
		};
		var assists: ChartDataSets = {
			data: [], label: ' Asistencie', stack: 'a'
		};
		var points: ChartDataSets = {
			data: [], label: ' +/- Body', stack: 'a'
		};

		this.matches.matches.slice().reverse().forEach(m => {
			let label = `${m.dateTime.toLocaleDateString('sk-SK')}: ${this.getEnum('teams', m.awayTeamId).name} vs ${this.getEnum('teams', m.homeTeamId).name}`;
			this.barChartLabels.push(label);
		});

		// goals
		this.stats.slice().reverse().forEach(s => {
			goals.data.push(s.goals);
		});

		// assists
		this.stats.slice().reverse().forEach(s => {
			assists.data.push(s.assists);
		});

		// +/- points
		this.stats.slice().reverse().forEach(s => {
			points.data.push(s.posNegPoints);
		});

		this.barChartData.push(goals);
		this.barChartData.push(assists);
		this.barChartData.push(points);

		this.radarChartData = [{
			data: [
				this.stats.reduce(function (sum, b) { return sum + b.goals; }, 0),
				this.stats.reduce(function (sum, b) { return sum + b.assists; }, 0),
				this.stats.reduce(function (sum, b) { return sum + b.posNegPoints; }, 0),
				this.stats.reduce(function (sum, b) { return sum + b.yellowCards; }, 0),
				this.stats.reduce(function (sum, b) { return sum + b.redCards; }, 0),
			],
		}];
	}
}
