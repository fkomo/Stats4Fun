import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PlayerStats } from '../../models/playerStats';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-players',
	templateUrl: './players.component.html',
	styleUrls: ['./players.component.css']
})

export class PlayersComponent extends BaseComponent {

	players: PlayerStats[];

	seasonId: number;
	matchTypeId: number;
	competitionId: number;
	teamId: number;
	playerPositionId: number;

	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.seasonId = this.getNumberFromStorage('seasonId');
		this.teamId = this.getNumberFromStorage('teamId');
		this.matchTypeId = this.getNumberFromStorage('matchTypeId');
		this.playerPositionId = this.getNumberFromStorage('playerPositionId');
		this.competitionId = this.getNumberFromStorage('competitionId');

		this.filter();
	}

	filter() {

		this.setStorage('seasonId', this.seasonId);
		this.setStorage('teamId', this.teamId);
		this.setStorage('matchTypeId', this.matchTypeId);
		this.setStorage('playerPositionId', this.playerPositionId);
		this.setStorage('competitionId', this.competitionId);

		this.apiService.listPlayerStats(
			this.seasonId,
			this.matchTypeId,
			this.competitionId,
			this.teamId,
			this.playerPositionId)
			.subscribe(i => this.players = i);
	}
}
