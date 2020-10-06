import { Injectable } from '@angular/core';
import config from '../app.config';

@Injectable({
	providedIn: 'root'
})

export class LogService {

	constructor() { }

	add(msg: any) {
		 if (!config.debug)
		 	return;

		console.log(new Date() + ": " + JSON.stringify(msg));
	}
}
