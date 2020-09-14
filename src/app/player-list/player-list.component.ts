import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseComponent } from '../base/base.component';
import { PlayerStats } from '../playerStats';

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent extends BaseComponent {

	@Input() players: PlayerStats[];
	@Input() expandedView: boolean;

	columns = {};
	selectedColumn: string;

	constructor(
		protected apiService: ApiService) {
		super(apiService);
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.selectedColumn = 'points';
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

		this.players = this.players.sort((i1, i2) => {
			var order = this.columns[columnName] ? -1 : 1;
			switch (columnName) {
				case "number":
					return order * ((i1.number > i2.number) ? 1 : (i1.number < i2.number) ? -1 : 0);
				case "name":
					return order * i1.name.localeCompare(i2.name);
				case "playerPosition":
					return order * ((i1.playerPositionId > i2.playerPositionId) ? 1 : (i1.playerPositionId < i2.playerPositionId) ? -1 : 0);
				case "gamesPlayed":
					return order * ((i1.gamesPlayed > i2.gamesPlayed) ? 1 : (i1.gamesPlayed < i2.gamesPlayed) ? -1 : 0);
				case "goals":
					return order * ((i1.goals > i2.goals) ? 1 : (i1.goals < i2.goals) ? -1 : 0);
				case "assists":
					return order * ((i1.assists > i2.assists) ? 1 : (i1.assists < i2.assists) ? -1 : 0);
				case "points":
					return order * ((i1.points > i2.points) ? 1 : (i1.points < i2.points) ? -1 : 0);
				case "posNegPoints":
					return order * ((i1.posNegPoints > i2.posNegPoints) ? 1 : (i1.posNegPoints < i2.posNegPoints) ? -1 : 0);
				case "yellowCards":
					return order * ((i1.yellowCards > i2.yellowCards) ? 1 : (i1.yellowCards < i2.yellowCards) ? -1 : 0);
				case "redCards":
					return order * ((i1.redCards > i2.redCards) ? 1 : (i1.redCards < i2.redCards) ? -1 : 0);
				case "wins":
					return order * ((i1.wins > i2.wins) ? 1 : (i1.wins < i2.wins) ? -1 : 0);
				case "losses":
					return order * ((i1.losses > i2.losses) ? 1 : (i1.losses < i2.losses) ? -1 : 0);
				case "ties":
					return order * ((i1.ties > i2.ties) ? 1 : (i1.ties < i2.ties) ? -1 : 0);
				default:
					return 0;
			}
		});
	}
}
