import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Player {
	id: number;
	name: string;
	dateOfBirth: Date;
	number: number;
	teamId: number;
	playerPositionId: number;
	retired: boolean;
	constructor(
		id: number, 
		name: string,
		dateOfBirth: string, 
		number: number, 
		teamId: number, 
		playerPositionId: number, 
		retired: boolean) {
		this.id = id;
		this.name = name;
		this.dateOfBirth = dateOfBirth != null ? new Date(dateOfBirth.slice(0, 10)) : null;
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
		return new Player(i.id, i.name, i.dateOfBirth, i.number, i.teamId, i.playerPositionId, i.retired);
	}
}