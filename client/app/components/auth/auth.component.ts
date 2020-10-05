import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { BaseComponent } from '../base/base.component';
import { ApiService } from 'client/app/services/api.service';
import { LogService } from 'client/app/services/log.service';

@Component({
	selector: 'app-auth',
	template: ``,
	styles: [
	]
})

export class AuthComponent extends BaseComponent {

	isAuthenticated: boolean;

	constructor(
		private log: LogService,
		public oktaAuth: OktaAuthService,
		private router: Router,
		protected apiService: ApiService) {
		super(apiService);

		this.oktaAuth.$authenticationState.subscribe(
			(isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
		  );
	}

	async ngOnInit() {
		this.isAuthenticated = await this.oktaAuth.isAuthenticated();
		if (this.isAuthenticated) {
			const userClaims = await this.oktaAuth.getUser();

			this.log.add(userClaims);
			this.log.add({ accessToken: this.getAccessToken() });

			if ((userClaims.groups as any[]).includes('4fun admins'))
				this.setStorage('admin', true);
			else
				this.setStorage('admin', false);
		}
		else
			this.setStorage('admin', false);

		this.router.navigate(['./']);
	}
}
