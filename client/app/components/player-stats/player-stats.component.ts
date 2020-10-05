import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ApiService } from '../../services/api.service';
import { Label } from 'ng2-charts';
import { BaseComponent } from '../base/base.component';
import { Mvp } from 'client/app/models/player';

@Component({
	selector: 'app-stats',
	templateUrl: './player-stats.component.html',
	styleUrls: ['./player-stats.component.css']
})

export class PlayerStatsComponent extends BaseComponent {

	selectedTeam: number = 0;
	mvps: MvpSeasons[];

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

	changeTeam(teamId: number) {
		this.selectedTeam = teamId;
		this.setStorage('selectedTeam', this.selectedTeam);

		this.mvps = [];
		this.apiService.listMVPs(this.selectedTeam).subscribe(
			mvps => {
				mvps.forEach(mvp => {
					if (mvp.player != null) {
						let m = this.mvps.find(m => m.playerId == mvp.player.playerId);
						if (m == null)
							this.mvps.push({ 
								playerId: mvp.player.playerId, 
								playerName: mvp.player.name, 
								playerNumber: mvp.player.number, 
								seasonIds: [mvp.season]
							});
						else
							m.seasonIds.push(mvp.season);
					}
				});

				this.mvps.forEach(mvp => {
					mvp.seasonIds = mvp.seasonIds.sort((i1, i2) => { return ((i1 > i2) ? 1 : (i1 < i2) ? -1 : 0); });
				});

				this.mvps = this.mvps.sort((i1, i2) => {
					return ((i1.seasonIds.length > i2.seasonIds.length) ? -1 : (i1.seasonIds.length < i2.seasonIds.length) ? 1 : 0);
				});
			});
	}
}

export class MvpSeasons {
	playerId: number;
	playerName: string;
	playerNumber: number;
	seasonIds: number[];
}