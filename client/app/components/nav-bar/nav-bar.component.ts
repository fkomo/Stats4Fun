import { Component, OnInit } from '@angular/core';
import { ApiService } from 'client/app/services/api.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent extends BaseComponent {

	currentTab: string;

	constructor(
		protected apiService: ApiService) {
		super(apiService)
	}

	tabChanged(tabName: string): void {
		this.currentTab = tabName;
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.tabChanged('players');
	}
}
