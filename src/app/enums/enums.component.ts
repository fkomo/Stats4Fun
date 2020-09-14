import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-enums',
	templateUrl: './enums.component.html',
	styleUrls: ['./enums.component.css']
})

export class EnumsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	clearCache() {
		sessionStorage.clear();	
	}
}
