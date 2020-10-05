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

	matchId: number;
	playerStatsId: number;

	constructor(
		playerId: number,
		name: string,
		dateOfBirth: string, 
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
		redCards: number,

		matchId: number,
		playerStatsId: number
	) {
		super(playerId, name, dateOfBirth, number, teamId, playerPositionId, retired);

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

		this.matchId = matchId;
		this.playerStatsId = playerStatsId;
	}
}

@Injectable({
	providedIn: "root",
})
export class PlayerStatsAdapter implements Adapter<PlayerStats> {
	adapt(i: any): PlayerStats {
		return new PlayerStats(
			i.playerId, i.name, i.dateOfBirth, i.number, i.teamId, i.playerPositionId, i.retired,
			i.gamesPlayed, i.wins, i.losses, i.ties,
			i.goals, i.assists, i.points, i.posNegPoints, i.yellowCards, i.redCards,
			i.matchId, i.playerStatsId);
	}
}