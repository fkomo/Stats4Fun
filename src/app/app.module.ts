import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { MatchComponent } from './match/match.component';
import { MatchesComponent } from './matches/matches.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnumComponent } from './enum/enum.component';
import { EnumsComponent } from './enums/enums.component';
import { MatchListComponent } from './match-list/match-list.component';
import { BaseComponent } from './base/base.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ScoringTimelineComponent } from './scoring-timeline/scoring-timeline.component';

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
