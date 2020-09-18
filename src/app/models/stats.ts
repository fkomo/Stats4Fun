import { Player } from './player';
import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class PlayerStats extends Player {
	gamesPlayed: number;
	wins: number;
	losses: number;
	ties: number;

	goals: number;
	assists: number;
	points: number;
	posNegPoints: number;
	yellowCards: number;
	redCards: number;

	constructor(
		id: number, 
		name: string,
		//dateOfBirth: Date, 
		number: number, 
		teamId: number, 
		playerPositionId: number, 
		retired: boolean,

		gamesPlayed: number,
		wins: number,
		losses: number,
		ties: number,
	
		goals: number,
		assists: number,
		points: number,
		posNegPoints: number,
		yellowCards: number,
		redCards: number
	) {
		super(id, name, null, number, teamId, playerPositionId, retired);

		this.gamesPlayed = gamesPlayed;
		this.wins = wins;
		this.losses = losses;
		this.ties = ties;
	
		this.goals = goals;
		this.assists = assists;
		this.points = points;
		this.posNegPoints = posNegPoints;
		this.yellowCards = yellowCards;
		this.redCards = redCards;
	}
}

@Injectable({
	providedIn: "root",
})
export class PlayerStatsAdapter implements Adapter<PlayerStats> {
	adapt(i: any): PlayerStats {
		return new PlayerStats(
			i.id, i.name, i.number, i.teamId, i.playerPositionId, i.retired,
			i.gamesPlayed, i.wins, i.losses, i.ties, 
			i.goals, i.assists, i.points, i.posNegPoints, i.yellowCards, i.redCards);
	}
}

export class PlayerMatchStats {
	id: number;
	playerId: number;
	matchId: number;
	goals: number;
	assists: number;
	points: number;
	posNegPoints: number;
	yellowCards: number;
	redCards: number;
	constructor(
		id: number,
		playerId: number,
		matchId: number,
		goals: number,
		assists: number,
		points: number,
		posNegPoints: number,
		yellowCards: number,
		redCards: number
	) {
		this.id = id;
		this.playerId = playerId;
		this.matchId = matchId;
		this.goals = goals;
		this.assists = assists;
		this.points = points;
		this.posNegPoints = posNegPoints;
		this.yellowCards = yellowCards;
		this.redCards = redCards;
	}
}

@Injectable({
	providedIn: "root",
})
export class PlayerMatchStatsAdapter implements Adapter<PlayerMatchStats> {
	adapt(i: any): PlayerMatchStats {
		return new PlayerMatchStats(
			i.id, 
			i.playerId, 
			i.matchId, 
			i.goals, 
			i.assists, 
			i.points,
			i.posNegPoints, 
			i.yellowCards, 
			i.redCards
		);
	}
}





export interface TeamStats {
	team1Id: number;
	team2Id: number;
	gamesPlayed: number;
	goalsFor: number;
	goalsAgainst: number;
	wins: number;
	losses: number;
	ties: number;
}
