import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../models/match';
import { MATCHES, PLAYER_MATCH_STATS, PLAYER_STATS, PLAYERS, COMPETITIONS, PLACES, MATCH_TYPES, TEAMS, SEASONS, MATCH_RESULTS, PLAYER_POSITIONS, TEAM_STATS } from './mock-data';
import { Player } from '../models/player';
import { Enum } from '../models/enum';
import { LogService } from './log.service';
import { PlayerStats } from '../models/playerStats';
import { TeamStats } from '../models/teamStats';
import { Observable, of } from 'rxjs';
import { PlayerMatchStats } from '../models/playerMatchStats';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	constructor(
		private log: LogService,
		private http: HttpClient) { 
		}

	enumByName(enumName: string): Observable<Enum[]> {
		this.log.add(`enumByName(${enumName})`);

		switch (enumName) {
			case 'players': return this.enumPlayers();
			case 'competitions': return this.enumCompetitions();
			case 'teams': return this.enumTeams();
			case 'places': return this.enumPlaces();
			case 'matchTypes': return this.enumMatchTypes();
			case 'seasons': return this.enumSeasons();
			case 'matchResults': return this.enumMatchResults();
			case 'playerPositions': return this.enumPlayerPositions();
			default:
				return null;
		}
	}

	enumPlayers(): Observable<Enum[]> {
		this.log.add(`enumPlayers`);

		var playersEnum: Enum[] = [];
		PLAYERS.forEach(p => {
			playersEnum.push({ id: p.id, name: p.name } as Enum);
		});

		return of(playersEnum);
	}

	enumCompetitions(): Observable<Enum[]> {
		this.log.add(`enumCompetitions`);

		return of(COMPETITIONS);
	}

	enumTeams(): Observable<Enum[]> {
		this.log.add(`enumTeams`);

		return of(TEAMS);
	}

	enumPlaces(): Observable<Enum[]> {
		this.log.add(`enumPlaces`);

		return of(PLACES);
	}

	enumMatchTypes(): Observable<Enum[]> {
		this.log.add(`enumMatchTypes`);

		return of(MATCH_TYPES);
	}

	enumSeasons(): Observable<Enum[]> {
		this.log.add(`enumSeasons`);

		return of(SEASONS);
	}

	enumMatchResults(): Observable<Enum[]> {
		this.log.add(`enumMatchResults`);

		return of(MATCH_RESULTS);
	}

	enumPlayerPositions(): Observable<Enum[]> {
		this.log.add(`enumPlayerPositions`);

		return of(PLAYER_POSITIONS);
	}

	saveEnum(enumName: string, item: Enum): Enum {
		this.log.add(item);

		return item;
	}

	deleteEnum(enumName: string, id: number): boolean {
		this.log.add(`deleteEnum(${enumName}, ${id})`);

		return true;
	}

	getTeamStats(seasonId: number, teamId: number, matchTypeId: number, placeId: number, matchResultId: number, 
		competitionId: number): Observable<TeamStats> {
		this.log.add(`getTeamStats(${seasonId}, ${teamId}, ${matchTypeId}, ${placeId}, ${matchResultId}, ${competitionId})`);
 
		return of(TEAM_STATS[1]);
	}

	getMutualStats(team1Id: number, team2Id: number): Observable<TeamStats> {
		this.log.add(`getMutualStats(${team1Id}, ${team2Id})`);

		return of(TEAM_STATS[0]);
	}

	listMutualMatches(team1Id: number, team2Id: number): Observable<Match[]> {
		this.log.add(`listMutualMatches(${team1Id}, ${team2Id})`);

		return of(MATCHES);
	}

	listMatches(seasonId: number, teamId: number, matchTypeId: number, placeId: number, matchResultId: number, 
		competitionId: number): Observable<Match[]> {
		this.log.add(`listMatches(${seasonId}, ${teamId}, ${matchTypeId}, ${placeId}, ${matchResultId}, ${competitionId})`);

		return of(MATCHES);
	}

	listPlayers(): Observable<Player[]> {
		this.log.add(`listPlayers`);

		return of(PLAYERS);
	}

	listPlayerMatches(id: number): Observable<Match[]> {
		this.log.add(`listPlayerMatches(${id})`);

		return of(MATCHES);
	}

	listPlayerMatchesStats(id: number): Observable<PlayerMatchStats[]> {
		this.log.add(`listPlayerMatchesStats(${id})`);

		return of(PLAYER_MATCH_STATS.filter(m => m.playerId == id));
	}

	listPlayerStats(
		seasonId: number, matchTypeId: number, competitionId: number, teamId: number, 
		playerPositionId: number): Observable<PlayerStats[]> {
		this.log.add(`listPlayerStats(${seasonId}, ${matchTypeId}, ${competitionId}, ${teamId}, ${playerPositionId})`);

		return of(PLAYER_STATS);
	}

	getPlayer(id: number): Player {
		this.log.add(`getPlayer(${id})`);

		return PLAYERS.find(p => p.id == id);
	}

	getMatch(id: number): Match {
		this.log.add(`getMatch(${id})`);

		var match = MATCHES.find(m => m.id == id);
		if (match != null)
			match.players = PLAYER_MATCH_STATS.filter(ps => ps.matchId == match.id);

		return match;
	}

	saveMatch(match: Match): Match {
		this.log.add(match);

		return match;
	}

	deleteMatch(id: number): boolean {
		this.log.add(`deleteMatch(${id})`);

		return true;
	}

	savePlayer(player: Player): Player {
		this.log.add(player);

		return player;
	}

	deletePlayer(id: number): boolean {
		this.log.add(`deletePlayer(${id})`);

		return true;
	}
}