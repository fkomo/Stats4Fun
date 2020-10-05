import { EnvService } from './env.service';

export const EnvServiceFactory = () => {

	const env = new EnvService();

	const browserWindow = window || {};
	const browserWindowEnv = browserWindow['__env'] || {};

	let debug: boolean = false;
	for (const key in browserWindowEnv) {
		if (browserWindowEnv.hasOwnProperty(key)) {
			env[key] = window['__env'][key];
			if (env.debug)
				console.log(`${ key }=${ env[key] }`);
		}
	}

	return env;
};

export const EnvServiceProvider = {
	provide: EnvService,
	useFactory: EnvServiceFactory,
	deps: [],
};
