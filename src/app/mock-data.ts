import { Match } from './match';
import { Player } from './player';
import { PlayerStats } from './playerStats';
import { PlayerMatchStats } from './playerMatchStats';
import { Enum } from './enum';
import { TeamStats } from './teamStats';

export const TEAMS: Enum[] = [
	{ id: 1, name: 'Inter Kokotovo' },
	{ id: 2, name: '1.FC Ujeby' },
	{ id: 3, name: 'SK. Slooovan' },
];

export const PLACES: Enum[] = [
	{ id: 1, name: 'mladost' },
	{ id: 2, name: 'ftvs' },
];

export const COMPETITIONS: Enum[] = [
	{ id: 1, name: '1.liga' },
	{ id: 2, name: '2.liga' },
];

export const MATCH_TYPES: Enum[] = [
	{ id: 1, name: 'liga' },
	{ id: 2, name: 'trening' },
];

export const MATCH_RESULTS: Enum[] = [
	{ id: 1, name: 'win' },
	{ id: 2, name: 'loss' },
	{ id: 3, name: 'tie' },
];

export const PLAYER_POSITIONS: Enum[] = [
	{ id: 1, name: 'utocnik' },
	{ id: 2, name: 'obranca' },
	{ id: 3, name: 'brankar' },
];

export const SEASONS: Enum[] = [
	{ id: 1, name: '2009/2010' },
	{ id: 2, name: '2010/2011' },
	{ id: 3, name: '2011/2012' },
];

export const PLAYERS: Player[] = [
	{ id: 1, name: 'Filip Komorovský', dateOfBirth: new Date("1985-06-19"), number: 13, teamId: 1, playerPositionId: 1, retired: false },
	{ id: 2, name: 'trtko', dateOfBirth: new Date("1990-08-10"), number: 10, teamId: 1, playerPositionId: 1, retired: false },
	{ id: 3, name: 'jebko', dateOfBirth: new Date("1985-01-11"), number: 5, teamId: 1, playerPositionId: 2, retired: true },
];

export const PLAYER_STATS: PlayerStats[] = [
	{ id: 1, name: 'Filip Komorovský', dateOfBirth: new Date("1985-06-19"), number: 13, teamId: 1, playerPositionId: 1, retired: false, gamesPlayed: 1, goals: 3, assists: 1, points: 5, posNegPoints: 0, yellowCards: 1, redCards: 0, wins: 1, losses: 0, ties: 0 },
	{ id: 2, name: 'trtko', dateOfBirth: new Date("1990-08-10"), number: 10, teamId: 1, playerPositionId: 1, retired: false, gamesPlayed: 5, goals: 4, assists: 3, points: 0, posNegPoints: 0, yellowCards: 1, redCards: 0, wins: 0, losses: 1, ties: 0 },
	{ id: 3, name: 'jebko', dateOfBirth: new Date("1985-01-11"), number: 5, teamId: 1, playerPositionId: 2, retired: true, gamesPlayed: 3, goals: 5, assists: 2, points: 1, posNegPoints: 0, yellowCards: 1, redCards: 0, wins: 0, losses: 0, ties: 1 },
];

export const PLAYER_MATCH_STATS: PlayerMatchStats[] = [
	{ id: 1, playerId: 1, matchId: 1, goals: 3, assists: 2, points: 5, posNegPoints: 4, yellowCards: 1, redCards: 0 },
	{ id: 2, playerId: 2, matchId: 1, goals: 1, assists: 3, points: 6, posNegPoints: 2, yellowCards: 0, redCards: 1 },
	{ id: 3, playerId: 3, matchId: 2, goals: 0, assists: 0, points: 1, posNegPoints: 1, yellowCards: 0, redCards: 0 },
	{ id: 4, playerId: 1, matchId: 2, goals: 2, assists: 0, points: 1, posNegPoints: -1, yellowCards: 0, redCards: 0 },
	{ id: 5, playerId: 2, matchId: 3, goals: 0, assists: 0, points: 1, posNegPoints: 1, yellowCards: 0, redCards: 0 },
	{ id: 6, playerId: 1, matchId: 3, goals: 1, assists: 6, points: 1, posNegPoints: 5, yellowCards: 0, redCards: 0 },
	{ id: 7, playerId: 3, matchId: 3, goals: 0, assists: 0, points: 1, posNegPoints: 1, yellowCards: 0, redCards: 0 },
	{ id: 8, playerId: 2, matchId: 4, goals: 0, assists: 0, points: 1, posNegPoints: 1, yellowCards: 0, redCards: 0 },
	{ id: 9, playerId: 1, matchId: 4, goals: 2, assists: 1, points: 1, posNegPoints: 0, yellowCards: 0, redCards: 0 },
	{ id: 10, playerId: 3, matchId: 4, goals: 0, assists: 0, points: 1, posNegPoints: 1, yellowCards: 0, redCards: 0 },
];

export const MATCHES: Match[] = [
	{ id: 1, dateTime: new Date("2016-05-15 13:30:00"), matchTypeId: 1, placeId: 1, competitionId: 1, homeTeamId: 1, awayTeamId: 2, homeTeamScore: 8, awayTeamScore: 4, players: null },
	{ id: 2, dateTime: new Date("2017-05-20 11:30:00"), matchTypeId: 2, placeId: 2, competitionId: 1, homeTeamId: 2, awayTeamId: 1, homeTeamScore: 1, awayTeamScore: 5, players: null },
	{ id: 3, dateTime: new Date("2018-05-20 11:30:00"), matchTypeId: 2, placeId: 1, competitionId: 1, homeTeamId: 2, awayTeamId: 1, homeTeamScore: 3, awayTeamScore: 3, players: null },
	{ id: 4, dateTime: new Date("2019-05-20 11:30:00"), matchTypeId: 2, placeId: 2, competitionId: 1, homeTeamId: 2, awayTeamId: 1, homeTeamScore: 7, awayTeamScore: 0, players: null },
];

export const TEAM_STATS: TeamStats[] = [
	{ team1Id: 1, team2Id: 2, goalsFor: 5, goalsAgainst: 13, gamesPlayed: 107, wins: 47, ties: 10, losses: 30 },
	{ team1Id: 1, team2Id: 0, goalsFor: 800, goalsAgainst: 750, gamesPlayed: 540, wins: 300, ties: 100, losses: 140 },
];