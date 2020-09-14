import { PlayerMatchStats } from './playerMatchStats';

export interface Match {
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
}