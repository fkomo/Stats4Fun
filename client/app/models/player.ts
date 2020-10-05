import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Player {
	playerId: number;
	name: string;
	dateOfBirth: Date;
	number: number;
	teamId: number;
	playerPositionId: number;
	retired: boolean;
	constructor(
		playerId: number, 
		name: string,
		dateOfBirth: string, 
		number: number, 
		teamId: number, 
		playerPositionId: number, 
		retired: boolean) {
		this.playerId = playerId;
		this.name = name;
		if (dateOfBirth != null)
			this.dateOfBirth = new Date(dateOfBirth.slice(0, 10));
		this.number = number;
		this.teamId = teamId;
		this.playerPositionId = playerPositionId;
		this.retired = retired;
	}
}

@Injectable({
	providedIn: "root",
})
export class PlayerAdapter implements Adapter<Player> {
	adapt(i: any): Player {
		return new Player(i.playerId, i.name, i.dateOfBirth, i.number, i.teamId, i.playerPositionId, i.retired);
	}
}

export class Mvp {
	season: number;
	player: Player;
	constructor(
		season: number, 
		player: any) {
		this.season = season;
		this.player = null;
		if (player != null) {
			let playerAdapter = new PlayerAdapter();
			this.player = playerAdapter.adapt(player) as Player;
		}
	}
}

@Injectable({
	providedIn: "root",
})
export class MvpAdapter implements Adapter<Mvp> {
	adapt(i: any): Mvp {
		return new Mvp(i.season, i.player);
	}
}