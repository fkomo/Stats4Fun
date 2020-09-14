import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchComponent } from './match/match.component';
import { EnumComponent } from './enum/enum.component';
import { EnumsComponent } from './enums/enums.component';

const routes: Routes = [
	{ path: '', redirectTo: '/players', pathMatch: 'full' },
	{ path: 'players', component: PlayersComponent },
	{ path: 'player/:id', component: PlayerComponent },
	{ path: 'player', component: PlayerComponent },
	{ path: 'matches', component: MatchesComponent },
	{ path: 'match/:id', component: MatchComponent },
	{ path: 'match', component: MatchComponent },
	{ path: 'enum', component: EnumComponent },
	{ path: 'enums', component: EnumsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }