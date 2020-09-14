import { Component, OnInit } from '@angular/core';
import { Enum } from '../enum';
import { ApiService } from '../api.service';
import { Player } from '../player';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-base',
	template: ``,
})

export class BaseComponent implements OnInit {

	// enums
	seasons: Enum[];
	teams: Enum[];
	matchTypes: Enum[];
	places: Enum[];
	matchResults: Enum[];
	competitions: Enum[];
	playerNames: Enum[];
	playerPositions: Enum[];

	private allPlayers: Player[];

	protected comboBoxValidator = [
		Validators.min(1),
		Validators.required];

	constructor(
		protected apiService: ApiService) {
	}

	ngOnInit(): void {

		this.seasons = this.getEnumFromStorage('seasons');
		if (this.seasons == null)
			this.apiService.enumByName('seasons').subscribe(i => {
				this.seasons = this.setStorage('seasons', i);
			});

		this.teams = this.getEnumFromStorage('teams');
		if (this.teams == null)
			this.apiService.enumByName('teams').subscribe(i => {
				this.teams = this.setStorage('teams', i);
			});

		this.matchTypes = this.getEnumFromStorage('matchTypes');
		if (this.matchTypes == null)
			this.apiService.enumByName('matchTypes').subscribe(i => {
				this.matchTypes = this.setStorage('matchTypes', i);
			});

		this.places = this.getEnumFromStorage('places');
		if (this.places == null)
			this.apiService.enumByName('places').subscribe(i => {
				this.places = this.setStorage('places', i);
			});

		this.matchResults = this.getEnumFromStorage('matchResults');
		if (this.matchResults == null)
			this.apiService.enumByName('matchResults').subscribe(i => {
				this.matchResults = this.setStorage('matchResults', i);
			});

		this.competitions = this.getEnumFromStorage('competitions');
		if (this.competitions == null)
			this.apiService.enumByName('competitions').subscribe(i => {
				this.competitions = this.setStorage('competitions', i);
			});

		this.playerNames = this.getEnumFromStorage('playerNames');
		if (this.playerNames == null)
			this.apiService.enumByName('players').subscribe(i => {
				this.playerNames = this.setStorage('playerNames', i);
			});
			
		this.playerPositions = this.getEnumFromStorage('playerPositions');
		if (this.playerPositions == null)
			this.apiService.enumByName('playerPositions').subscribe(i => {
				this.playerPositions = this.setStorage('playerPositions', i);
			});

		this.apiService.listPlayers().subscribe(i => this.allPlayers = i);
	}

	protected getPlayer(id: number): Player {
		return this.allPlayers.find(i => i.id == id);
	}

	public getEnum(enumName: string, id: number): Enum {

		switch (enumName) {
			case 'places':
				return this.places.find(i => i.id == id);

			case 'matchTypes':
				return this.matchTypes.find(i => i.id == id);

			case 'competitions':
				return this.competitions.find(i => i.id == id);

			case 'teams':
				return this.teams.find(i => i.id == id);

			case 'playerPositions':
				return this.playerPositions.find(i => i.id == id);

			case 'seasons':
				return this.seasons.find(i => i.id == id);

			case 'matchResults':
				return this.matchResults.find(i => i.id == id);

			case 'playerNames':
				return this.playerNames.find(i => i.id == id);

			default:
				return null;
		}
	}

	getNumberFromStorage(key: string, defaultValue: number = 0): number {
		var fromSession = sessionStorage.getItem(key);
		if (fromSession != null)
			return Number(JSON.parse(fromSession));

		return defaultValue;
	}

	getEnumFromStorage(key: string): Enum[] {
		var fromSession = sessionStorage.getItem(key);
		if (fromSession != null)
			return JSON.parse(fromSession) as Enum[];

		return null;
	}

	setStorage(key: string, value: any): any {
		sessionStorage.setItem(key, JSON.stringify(value));
		return value;
	}
}
