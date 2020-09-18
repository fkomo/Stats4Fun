import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Match } from '../../models/match';
import { BaseComponent } from '../base/base.component';
import { ApiService } from '../../services/api.service';
import { PlayerMatchStats } from '../../models/stats';

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
			yAxes: [{
				ticks: {
					stepSize: 1
				}
			}]
		},
	};

	// if there are too many matches - hide x labels, ...
	private tooMuchDataOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [{
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

	@Input() stats: PlayerMatchStats[];
	@Input() matches: Match[];

	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.createChartData();
	}

	createChartData() {

		this.barChartLabels = [];
		this.barChartData = [];
		if (this.matches.length < 1 || this.stats.length < 1)
			return;

		var goals: ChartDataSets = {
			data: [], label: ' Goals', stack: 'a'
		};
		var assists: ChartDataSets = {
			data: [], label: ' Assists', stack: 'a'
		};
		var points: ChartDataSets = {
			data: [], label: ' +/- Points', stack: 'a'
		};

		//if (this.matches.length > 10)
			this.barChartOptions = this.tooMuchDataOptions;

		this.matches.forEach(m => {
			let label = `${ m.dateTime.toLocaleDateString('sk-SK') }: ${ this.getEnum('teams', m.awayTeamId).name } vs ${ this.getEnum('teams', m.homeTeamId).name }`;
			this.barChartLabels.push(label);
		});

		// goals
		this.stats.forEach(s => {
			goals.data.push(s.goals);
		});

		// assists
		this.stats.forEach(s => {
			assists.data.push(s.assists);
		});

		// +/- points
		this.stats.forEach(s => {
			points.data.push(s.posNegPoints);
		});

		this.barChartData.push(goals);
		this.barChartData.push(assists);
		this.barChartData.push(points);
	}
}
