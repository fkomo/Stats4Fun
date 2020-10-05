import { Component, OnInit } from '@angular/core';
import { Enum } from '../../models/enum';
import { ApiService } from '../../services/api.service';
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
	enumsLoaded: boolean = false;

	playerStates: Enum[] = [
		{ id: 3, name: 'Aktívny' },
		{ id: 2, name: 'Neaktívny' }
	];

	orderedPlayerNames: Enum[];

	protected comboBoxValidator = [
		Validators.min(1),
		Validators.required];

	constructor(
		protected apiService: ApiService) {
	}

	ngOnInit(): void {

		let enumsInStorage = this.getBoolFromStorage('enumsLoaded');
		if (enumsInStorage) {
			this.seasons = this.getEnumFromStorage('seasons');
			this.teams = this.getEnumFromStorage('teams');
			this.matchTypes = this.getEnumFromStorage('matchTypes');
			this.places = this.getEnumFromStorage('places');
			this.matchResults = this.getEnumFromStorage('matchResults');
			this.competitions = this.getEnumFromStorage('competitions');
			this.playerNames = this.getEnumFromStorage('playerNames');
			this.playerPositions = this.getEnumFromStorage('playerPositions');
			this.orderedPlayerNames = this.getEnumFromStorage('orderedPlayerNames');
			this.enumsLoaded = true;
		}
		else {
			this.apiService.enumAll().subscribe(allEnums => {
				this.seasons = this.setStorage('seasons', allEnums[0]);
				this.teams = this.setStorage('teams', allEnums[1]);
				this.matchTypes = this.setStorage('matchTypes', allEnums[2]);
				this.places = this.setStorage('places', allEnums[3]);
				this.matchResults = this.setStorage('matchResults', allEnums[4]);
				this.competitions = this.setStorage('competitions', allEnums[5]);
				this.playerNames = this.setStorage('playerNames', allEnums[6]);
				this.playerPositions = this.setStorage('playerPositions', allEnums[7]);

				this.orderedPlayerNames = this.setStorage('orderedPlayerNames',
					this.playerNames.sort((i1, i2) => {
						return i1.name.localeCompare(i2.name);
					}));

				this.enumsLoaded = this.setStorage('enumsLoaded', true);
			});
		}
	}

	public getEnum(enumName: string, id: number): Enum {

		if (!this.enumsLoaded) {
			return null;
		}

		switch (enumName) {
			case 'places':
				return this.places.find(i => i.id == id);

			case 'matchTypes':
				return this.matchTypes.find(i => i.id == id);

			case 'competitions':
				return this.competitions.find(i => i.id == id);

			case 'teams':
				return id == 0 ? new Enum(0, '4Fun') : this.teams.find(i => i.id == id);

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

	getBoolFromStorage(key: string): boolean {
		var fromSession = sessionStorage.getItem(key);
		if (fromSession != null)
			return Boolean(JSON.parse(fromSession));

		return false;
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

	public getStringMutation(value: number, one: string, two2Five: string, more: string): string {
		if (value == 1)
			return one;
		if (value > 1 && value < 5)
			return two2Five;
		return more;
	}

	isAdmin(): boolean {
		return this.getBoolFromStorage('admin');
	}

	protected getAccessToken() {
		var oktaTokenStorage = JSON.parse(localStorage.getItem('okta-token-storage'));
		return oktaTokenStorage.accessToken.value;
	}

	public getPlayerAge(dateOfBirth: Date): number {
		if (dateOfBirth == null)
			return null;
		var timeDiff = Math.abs(Date.now() - new Date(dateOfBirth).getTime());
		return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
	}
}
