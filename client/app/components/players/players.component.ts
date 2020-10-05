import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PlayerStats } from '../../models/playerStats';
import { BaseComponent } from '../base/base.component';

export class TextValue {
	value: number;
	text1: string;
	text2to4: string;
	text5: string;
}

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
	playerStateId: number;

	avgAge: number;
	minAge: number;
	minAgePlayerId: number;
	maxAge: number;
	maxAgePlayerId: number;

	goalkeeperCount: number;
	defenderCount: number;
	attackerCount: number;

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
		this.playerStateId = this.getNumberFromStorage('playerStateId');

		this.filter();
	}

	filter() {

		this.setStorage('seasonId', this.seasonId);
		this.setStorage('teamId', this.teamId);
		this.setStorage('matchTypeId', this.matchTypeId);
		this.setStorage('playerPositionId', this.playerPositionId);
		this.setStorage('competitionId', this.competitionId);
		this.setStorage('playerStateId', this.playerStateId);

		this.avgAge = 0;
		this.minAge = 0;
		this.maxAge = 0;
		this.goalkeeperCount = 0;
		this.attackerCount = 0;
		this.defenderCount = 0;

		this.apiService.listPlayerStats(
			this.seasonId,
			this.matchTypeId,
			this.competitionId,
			this.teamId,
			this.playerPositionId,
			this.playerStateId)
			.subscribe(players => {
				this.players = players;
				this.avgAge = this.minAge = this.maxAge = 0;
				this.goalkeeperCount = this.attackerCount = this.defenderCount = 0;

				if (this.players.length > 0) {
					let that = this;
					const ageCount = players.reduce(function (count, p) { return p.dateOfBirth != null ? count + 1 : count; }, 0);
					const totalAge = players.reduce(function (sum, p) { return p.dateOfBirth != null ? sum + that.getPlayerAge(p.dateOfBirth) : sum + 0; }, 0);
					this.avgAge = totalAge / ageCount;

					const playersAgeSorted = players.filter(p => p.dateOfBirth != null)
						.sort((i1, i2) => {
							const i1Age = that.getPlayerAge(i1.dateOfBirth);
							const i2Age = that.getPlayerAge(i2.dateOfBirth);
							return i1Age > i2Age ? 1 : (i1Age < i2Age ? -1 : 0);
						});

					this.minAge = that.getPlayerAge(playersAgeSorted[0].dateOfBirth);
					this.minAgePlayerId = playersAgeSorted[0].playerId;

					this.maxAge = that.getPlayerAge(playersAgeSorted[playersAgeSorted.length - 1].dateOfBirth);
					this.maxAgePlayerId = playersAgeSorted[playersAgeSorted.length - 1].playerId;

					this.goalkeeperCount = players.reduce(function (count, p) { return p.playerPositionId == 3 ? count + 1 : count; }, 0);
					this.attackerCount = players.reduce(function (count, p) { return p.playerPositionId == 2 ? count + 1 : count; }, 0);
					this.defenderCount = players.reduce(function (count, p) { return p.playerPositionId == 1 ? count + 1 : count; }, 0);
				}
			});
	}
}
