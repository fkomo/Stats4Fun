import { Component, OnInit } from '@angular/core';
import { ApiService } from 'client/app/services/api.service';
import { BaseComponent } from '../base/base.component';
import { OktaAuthService } from '@okta/okta-angular';
import { LogService } from 'client/app/services/log.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent extends BaseComponent {

	currentTab: string;

	constructor(
		private log: LogService,
		public oktaAuth: OktaAuthService,
		protected apiService: ApiService) {
		super(apiService)
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.tabChanged('players');
	}

	async tabChanged(tabName: string) {
		this.log.add(`tabChanged(${tabName})`);
		this.currentTab = tabName;

		if (tabName == 'admin') {
			// let isAuthenticated = await this.oktaAuth.isAuthenticated();
			// if (isAuthenticated)
			// 	this.logout();
			// else
			this.login();
		}
	}

	logout() {
		sessionStorage.clear();	
		this.oktaAuth.logout('/auth');
	}

	login() {
		this.oktaAuth.loginRedirect('/auth');
	}
}
