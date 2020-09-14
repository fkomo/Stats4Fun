import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/player/player.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchComponent } from './components/match/match.component';
import { EnumComponent } from './components/enum/enum.component';
import { EnumsComponent } from './components/enums/enums.component';

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