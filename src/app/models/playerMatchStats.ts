import { Stats } from './stats';

export interface PlayerMatchStats extends Stats {
	id: number;
	playerId: number;
	matchId: number;
}