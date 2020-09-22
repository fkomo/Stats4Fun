import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { PlayerStats } from 'client/app/models/playerStats';
import { ApiService } from 'client/app/services/api.service';
import { Label } from 'ng2-charts';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.css']
})

export class StatsComponent extends BaseComponent {

	public chartOptions: ChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false
				}
			}],
			yAxes: [{
				gridLines: {
					display: false
				}
			}]
		},
	};

	public topGoalsChartType: ChartType = 'horizontalBar';
	public topGoalsChartLabels: Label[] = [];
	public topGoalsChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	public topAssistsChartType: ChartType = 'horizontalBar';
	public topAssistsChartLabels: Label[] = [];
	public topAssistsChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	public topPointsChartType: ChartType = 'horizontalBar';
	public topPointsChartLabels: Label[] = [];
	public topPointsChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	public topPosNegChartType: ChartType = 'horizontalBar';
	public topPosNegChartLabels: Label[] = [];
	public topPosNegChartDataSets: ChartDataSets[] = [{
		data: []
	}];

	stats: PlayerStats[];

	constructor(
		private router: Router,
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.apiService.listPlayerStats(0, 0, 0, 0, 0).subscribe(
			s => {
				this.stats = s;
				this.createChartData();
			});
	}

	private createChartData() {

		const topGoals = this.stats.sort((i1, i2) => { return ((i1.goals > i2.goals) ? -1 : (i1.goals < i2.goals) ? 1 : 0); }).slice(0, 5);
		this.topGoalsChartLabels = topGoals.map(s => { return s.name; });
		this.topGoalsChartDataSets = [{
			label: ' Góly',
			data: topGoals.map(s => { return s.goals; })
		}];

		const topAssists = this.stats.sort((i1, i2) => { return ((i1.assists > i2.assists) ? -1 : (i1.assists < i2.assists) ? 1 : 0); }).slice(0, 5);
		this.topAssistsChartLabels = topGoals.map(s => { return s.name; });
		this.topAssistsChartDataSets = [{
			label: ' Asistencie',
			data: topAssists.map(s => { return s.assists; })
		}];

		const topPoints = this.stats.sort((i1, i2) => { return ((i1.points > i2.points) ? -1 : (i1.points < i2.points) ? 1 : 0); }).slice(0, 5);
		this.topPointsChartLabels = topPoints.map(s => { return s.name; });
		this.topPointsChartDataSets = [{
			label: ' Body',
			data: topPoints.map(s => { return s.points; })
		}];

		const topPosNeg = this.stats.sort((i1, i2) => { return ((i1.posNegPoints > i2.posNegPoints) ? -1 : (i1.posNegPoints < i2.posNegPoints) ? 1 : 0); }).slice(0, 5);
		this.topPosNegChartLabels = topPosNeg.map(s => { return s.name; });
		this.topPosNegChartDataSets = [{
			label: ' +/- Body',
			data: topPosNeg.map(s => { return s.posNegPoints; })
		}];
	}
}
