import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

	currentTab: string;

	constructor() {
	}

	tabChanged(tabName: string): void {
		this.currentTab = tabName;
	}

	ngOnInit(): void {
		this.tabChanged('players');
	}
}
