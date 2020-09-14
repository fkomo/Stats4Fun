import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './components/player/player.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchComponent } from './components/match/match.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnumComponent } from './components/enum/enum.component';
import { EnumsComponent } from './components/enums/enums.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { BaseComponent } from './components/base/base.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ScoringTimelineComponent } from './components/scoring-timeline/scoring-timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayersComponent,
    MatchComponent,
    MatchesComponent,
    NavBarComponent,
    EnumComponent,
	EnumsComponent,
	MatchListComponent,
	BaseComponent,
	PlayerListComponent,
	ScoringTimelineComponent,
  ],
  imports: [
	BrowserModule,
	ChartsModule,
	AppRoutingModule,
	ReactiveFormsModule,
	FormsModule,
	HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
