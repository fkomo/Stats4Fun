import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
	providedIn: 'root'
})

export class LogService {

	constructor(private env: EnvService) { }

	add(msg: any) {
		if (!this.env.debug)
			return;

		console.log(new Date() + ": " + JSON.stringify(msg));
	}
}
