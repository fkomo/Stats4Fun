import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class TeamStats {
	seasonId: number;
	gamesPlayed: number;
	wins: number;
	losses: number;
	ties: number;
	goalsFor: number;
	goalsAgainst: number;
	yellowCards: number;
	redCards: number;
	constructor(
		seasonId: number, 
		gamesPlayed: number,
		wins: number, 
		losses: number, 
		ties: number, 
		goalsFor: number, 
		goalsAgainst: number,
		yellowCards: number, 
		redCards: number) {
		this.seasonId = seasonId;
		this.gamesPlayed = gamesPlayed;
		this.wins = wins;
		this.losses = losses;
		this.ties = ties;
		this.goalsFor = goalsFor;
		this.goalsAgainst = goalsAgainst;
		this.yellowCards = yellowCards;
		this.redCards = redCards;
	}
}

@Injectable({
	providedIn: "root",
})
export class TeamStatsAdapter implements Adapter<TeamStats> {
	adapt(i: any): TeamStats {
		return new TeamStats(
			i.seasonId, 
			i.gamesPlayed, 
			i.wins, 
			i.losses, 
			i.ties, 
			i.goalsFor, 
			i.goalsAgainst,
			i.yellowCards,
			i.redCards);
	}
}