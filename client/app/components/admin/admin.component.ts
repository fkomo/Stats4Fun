import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'client/app/services/api.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent extends BaseComponent {

	constructor(
		private router: Router,
		protected apiService: ApiService) {
		super(apiService)
	}

	ngOnInit(): void {
		super.ngOnInit();
	}

	login() {
		this.setStorage('admin', true);
	}

	logout() {
		this.setStorage('admin', false);
		this.router.navigate(['./']);
	}
}
