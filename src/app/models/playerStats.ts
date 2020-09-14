import { Player } from './player';
import { Stats } from './stats';

export interface PlayerStats extends Player, Stats {
	gamesPlayed: number;
	wins: number;
	losses: number;
	ties: number;
}