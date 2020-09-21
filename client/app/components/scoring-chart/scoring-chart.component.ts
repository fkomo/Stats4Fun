import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { BaseComponent } from '../base/base.component';
import { ApiService } from '../../services/api.service';
import { PlayerStats } from '../../models/playerStats';
import { Router } from '@angular/router';

@Component({
	selector: 'app-scoring-chart',
	templateUrl: './scoring-chart.component.html',
	styleUrls: ['./scoring-chart.component.css']
})
export class ScoringChartComponent extends BaseComponent {

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

	constructor(
		private router: Router,
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.createChartData();
	}

	createChartData() {

		// if (this.stats == null || this.stats.length < 1)
		// 	return;

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
