(function (window) {
	window.__env = window.__env || {};

	window.__env.debug = true;
	window.__env.apiUrl = 'http://localhost:8081/api';

	window.__env.oktaClientId = '';
	window.__env.oktaIssuer = 'https://?.okta.com/oauth2/default';
	window.__env.oktaRedirectUri = 'http://localhost:4200/auth/callback';
}(this));

