import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";
import { PlayerStats, PlayerStatsAdapter } from './playerStats';

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
	players: PlayerStats[];

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
		players: any[]) {
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
		if (players != null) {
			let playerStatsAdapter = new PlayerStatsAdapter();
			this.players = players.map(item => playerStatsAdapter.adapt(item)) as PlayerStats[];
		}
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

export class Matches {
	opponentTeamId: number;
	gamesPlayed: number;
	goalsFor: number;
	goalsAgainst: number;
	wins: number;
	losses: number;
	ties: number;
	matches: Match[];
	constructor(
		opponentTeamId: number,
		gamesPlayed: number,
		goalsFor: number,
		goalsAgainst: number,
		wins: number,
		losses: number,
		ties: number,
		matches: any[]) {
		this.opponentTeamId = opponentTeamId;
		this.gamesPlayed = gamesPlayed;
		this.goalsFor = goalsFor;
		this.goalsAgainst = goalsAgainst;
		this.wins = wins;
		this.losses = losses;
		this.ties = ties;

		this.matches = [];
		if (matches != null) {
			let matchAdapter = new MatchAdapter();
			this.matches = matches.map(item => matchAdapter.adapt(item)) as Match[];
		}
	}
}

@Injectable({
	providedIn: "root",
})
export class MatchesAdapter implements Adapter<Matches> {
	adapt(item: any): Matches {
		return new Matches(
			item.opponentTeamId,
			item.gamesPlayed,
			item.goalsFor,
			item.goalsAgainst,
			item.wins,
			item.losses,
			item.ties,
			item.matches);
	}
}
