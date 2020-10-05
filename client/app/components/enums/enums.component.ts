import { Component, OnInit } from '@angular/core';
import { ApiService } from 'client/app/services/api.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-enums',
	templateUrl: './enums.component.html',
	styleUrls: ['./enums.component.css']
})

export class EnumsComponent extends BaseComponent {

	constructor(
		protected apiService: ApiService) {
		super(apiService)
	}

	ngOnInit(): void {
		super.ngOnInit();
	}

	clearCache() {
		sessionStorage.clear();	
		localStorage.clear();
	}
}
