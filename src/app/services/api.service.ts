import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match, MatchAdapter } from '../models/match';
import { MATCHES, PLAYER_MATCH_STATS, PLAYER_STATS, PLAYERS, TEAM_STATS } from './mock-data';
import { Player, PlayerAdapter } from '../models/player';
import { PlayerMatchStatsAdapter, PlayerStatsAdapter } from '../models/stats';
import { Enum, EnumAdapter } from '../models/enum';
import { LogService } from './log.service';
import { PlayerStats, TeamStats, PlayerMatchStats } from '../models/stats';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { forkJoin } from 'rxjs';  // RxJS 6 syntax

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	private baseUrl = "http://localhost:8042/api";

	constructor(
		private log: LogService,
		private http: HttpClient,
		private enumAdapter: EnumAdapter,
		private playerAdapter: PlayerAdapter,
		private playerStatsAdapter: PlayerStatsAdapter,
		private matchAdapter: MatchAdapter,
		private playerMatchStatsAdapter: PlayerMatchStatsAdapter) {
	}

	enumAll(): Observable<Enum[][]> {
		this.log.add(`enumAll()`);

		return forkJoin([
			this.enumSeasons(),
			this.enumTeams(),
			this.enumMatchTypes(),
			this.enumPlaces(),
			this.enumMatchResults(),
			this.enumCompetitions(),
			this.enumPlayerNames(),
			this.enumPlayerPositions()
		]);
	}

	enumByName(enumName: string): Observable<Enum[]> {
		this.log.add(`enumByName(${enumName})`);

		switch (enumName) {
			case 'playerNames': return this.enumPlayerNames();
			case 'competitions': return this.enumCompetitions();
			case 'teams': return this.enumTeams();
			case 'places': return this.enumPlaces();
			case 'matchTypes': return this.enumMatchTypes();
			case 'seasons': return this.enumSeasons();
			case 'matchResults': return this.enumMatchResults();
			case 'playerPositions': return this.enumPlayerPositions();
			case 'states': return this.enumStates();
			default:
				return null;
		}
	}

	enumPlayerNames(): Observable<Enum[]> {
		this.log.add(`enumPlayerNames`);

		// get: /enums/playernames
		return this.http.get(`${this.baseUrl}/enums/playerNames`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumCompetitions(): Observable<Enum[]> {
		this.log.add(`enumCompetitions`);

		// get: /enums/competitions
		return this.http.get(`${this.baseUrl}/enums/competitions`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumTeams(): Observable<Enum[]> {
		this.log.add(`enumTeams`);

		// get: /enums/teams
		return this.http.get(`${this.baseUrl}/enums/teams`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumPlaces(): Observable<Enum[]> {
		this.log.add(`enumPlaces`);

		// get: /enums/places
		return this.http.get(`${this.baseUrl}/enums/places`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumMatchTypes(): Observable<Enum[]> {
		this.log.add(`enumMatchTypes`);

		// get: /enums/matchtypes
		return this.http.get(`${this.baseUrl}/enums/matchTypes`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumSeasons(): Observable<Enum[]> {
		this.log.add(`enumSeasons`);

		// get: /enums/seasons
		return this.http.get(`${this.baseUrl}/enums/seasons`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumMatchResults(): Observable<Enum[]> {
		this.log.add(`enumMatchResults`);

		// get: /enums/matchresults
		return this.http.get(`${this.baseUrl}/enums/matchResults`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumPlayerPositions(): Observable<Enum[]> {
		this.log.add(`enumPlayerPositions`);

		// get: /enums/playerpositions
		return this.http.get(`${this.baseUrl}/enums/playerPositions`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	enumStates(): Observable<Enum[]> {
		this.log.add(`enumStates`);

		// get: /enums/states
		return this.http.get(`${this.baseUrl}/enums/states`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	saveEnum(enumName: string, item: Enum): Observable<Enum> {
		this.log.add(item);

		// insert
		if (item.id == 0) {
			// post: /enums/*
			return this.http.post(`${this.baseUrl}/enums/${enumName}`, { name: item.name, id: item.id }).pipe(
				map((data: any) => this.enumAdapter.adapt(item))
			);
		}
		// update
		else {
			// put: /enums/*/:id
			return this.http.put(`${this.baseUrl}/enums/${enumName}/${item.id}`, { name: item.name, id: item.id }).pipe(
				map((data: any) => this.enumAdapter.adapt(item))
			);
		}
	}

	listPlayerStats(
		seasonId: number, matchTypeId: number, competitionId: number, teamId: number,
		playerPositionId: number): Observable<PlayerStats[]> {
		this.log.add(`listPlayerStats(${seasonId}, ${matchTypeId}, ${competitionId}, ${teamId}, ${playerPositionId})`);

		// post: /players/stats
		return this.http.post(`${this.baseUrl}/players/stats`,
			{
				seasonId: seasonId == 0 ? null : seasonId,
				matchTypeId: matchTypeId == 0 ? null : matchTypeId,
				competitionId: competitionId == 0 ? null : competitionId,
				teamId: teamId == 0 ? null : teamId,
				playerPositionId: playerPositionId == 0 ? null : playerPositionId,
			}).pipe(
				map((data: any[]) => data.map((item) => this.playerStatsAdapter.adapt(item)))
			);
	}

	listPlayerSeasons(playerId: number): Observable<Enum[]> {
		this.log.add(`listPlayerSeasons(${playerId})`);

		// get: /enums/seasons/player/:id
		return this.http.get(`${this.baseUrl}/enums/seasons/player/${playerId}`).pipe(
			map((data: any[]) => data.map((item) => this.enumAdapter.adapt(item)))
		);
	}

	getPlayer(id: number): Observable<Player> {
		this.log.add(`getPlayer(${id})`);

		// get: /players/:id
		return this.http.get(`${this.baseUrl}/player/${id}`).pipe(
			map((data: any) => this.playerAdapter.adapt(data))
		);
	}

	savePlayer(player: Player): Observable<Player> {
		this.log.add(player);

		// insert
		if (player.id == 0) {
			// post: /player
			return this.http.post(`${this.baseUrl}/player`,
				{
					name: player.name,
					dateOfBirth: player.dateOfBirth,
					number: player.number,
					playerPositionId: player.playerPositionId,
					teamId: player.teamId,
					retired: player.retired,
				}).pipe(
					map((data: any) => this.playerAdapter.adapt(data))
				);
		}
		// update
		else {
			// put: /player/:id
			return this.http.put(`${this.baseUrl}/player/${player.id}`,
				{
					id: player.id,
					name: player.name,
					dateOfBirth: player.dateOfBirth,
					number: player.number,
					playerPositionId: player.playerPositionId,
					teamId: player.teamId,
					retired: player.retired,
				}).pipe(
					map((data: any) => this.playerAdapter.adapt(data))
				);
		}
	}

	deletePlayer(id: number): Observable<any> {
		this.log.add(`deletePlayer(${id})`);

		// delete: /player
		return this.http.delete(`${this.baseUrl}/player/${id}`);
	}

	listPlayerMatches(id: number, seasonId: number): Observable<Match[]> {
		this.log.add(`listPlayerMatches(${id}, ${seasonId})`);

		// /matches/player/:id
		return this.http.post(`${this.baseUrl}/matches/player/${id}`, {
			season: seasonId == 0 ? null : seasonId,
		}).pipe(
			map((data: any[]) => data.map((item) => this.matchAdapter.adapt(item)))
		);
	}

	listPlayerMatchesStats(id: number, seasonId: number): Observable<PlayerMatchStats[]> {
		this.log.add(`listPlayerMatchesStats(${id}, ${seasonId})`);

		// /stats/player/:id
		return this.http.post(`${this.baseUrl}/stats/player/${id}`, {
			season: seasonId == 0 ? null : seasonId,
		}).pipe(
			map((data: any[]) => data.map((item) => this.playerMatchStatsAdapter.adapt(item)))
		);
	}

	getTeamStats(seasonId: number, teamId: number, matchTypeId: number, placeId: number, matchResultId: number,
		competitionId: number): Observable<TeamStats> {
		this.log.add(`getTeamStats(${seasonId}, ${teamId}, ${matchTypeId}, ${placeId}, ${matchResultId}, ${competitionId})`);

		// /team/stats
		return of(TEAM_STATS[1]);
	}

	getMutualStats(team1Id: number, team2Id: number): Observable<TeamStats> {
		this.log.add(`getMutualStats(${team1Id}, ${team2Id})`);

		// /stats/teams
		return of(TEAM_STATS[0]);
	}

	listMutualMatches(team1Id: number, team2Id: number): Observable<Match[]> {
		this.log.add(`listMutualMatches(${team1Id}, ${team2Id})`);

		// /matches/teams
		return of(MATCHES);
	}

	listMatches(seasonId: number, teamId: number, matchTypeId: number, placeId: number, matchResultId: number,
		competitionId: number): Observable<Match[]> {
		this.log.add(`listMatches(${seasonId}, ${teamId}, ${matchTypeId}, ${placeId}, ${matchResultId}, ${competitionId})`);

		// /matches
		return of(MATCHES);
	}

	listMatchPlayers(id: number): Observable<PlayerStats[]> {
		this.log.add(`listMatchPlayers(${id})`);

		// /stats/match/:id
		return of(PLAYER_STATS);
	}

	getMatch(id: number): Match {
		this.log.add(`getMatch(${id})`);

		var match = MATCHES.find(m => m.id == id);
		if (match != null)
			match.players = PLAYER_MATCH_STATS.filter(ps => ps.matchId == match.id);

		// /match/:id
		return match;
	}

	saveMatch(match: Match): Match {
		this.log.add(match);

		// /match/:id
		return match;
	}

	deleteMatch(id: number): boolean {
		this.log.add(`deleteMatch(${id})`);

		// /match/:id
		return true;
	}
}
