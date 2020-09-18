import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";
import { PlayerMatchStats } from './stats';

export class Match {
	id: number;
	dateTime: Date;
	matchTypeId: number;
	placeId: number;
	competitionId: number;
	homeTeamId: number;
	awayTeamId: number;
	homeTeamScore: number;
	awayTeamScore: number;
	players: PlayerMatchStats[];

	constructor(
		id: number,
		dateTime: string,
		matchTypeId: number,
		placeId: number,
		competitionId: number,
		homeTeamId: number,
		awayTeamId: number,
		homeTeamScore: number,
		awayTeamScore: number,
		players: PlayerMatchStats[]) {
		this.id = id;
		this.dateTime = dateTime != null ? new Date(dateTime.slice(0, 16)) : null;;
		this.matchTypeId = matchTypeId;
		this.placeId = placeId;
		this.competitionId = competitionId;
		this.homeTeamId = homeTeamId;
		this.awayTeamId = awayTeamId;
		this.homeTeamScore = homeTeamScore;
		this.awayTeamScore = awayTeamScore;
		this.players = [];
	}
}

@Injectable({
	providedIn: "root",
})
export class MatchAdapter implements Adapter<Match> {
	adapt(item: any): Match {
		return new Match(
			item.id, 
			item.dateTime, 
			item.matchTypeId, 
			item.placeId, 
			item.competitionId,
			item.homeTeamId,
			item.awayTeamId,
			item.homeTeamScore,
			item.awayTeamScore,
			item.players);
	}
}
