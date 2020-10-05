import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/player/player.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchComponent } from './components/match/match.component';
import { EnumComponent } from './components/enum/enum.component';
import { EnumsComponent } from './components/enums/enums.component';
import { TeamStatsComponent } from './components/team-stats/team-stats.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AuthComponent } from './components/auth/auth.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';

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
	{ path: 'teamStats', component: TeamStatsComponent },
	{ path: 'playerStats', component: PlayerStatsComponent },
	{ path: 'auth/callback', component: OktaCallbackComponent },
	{ path: 'auth', component: AuthComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }