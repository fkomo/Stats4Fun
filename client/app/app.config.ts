const { 
	OKTA_CLIENT_ID, 
	OKTA_ISSUER, 
	OKTA_REDIRECT_URI, 
	API_URL, 
	DEBUG,

} = process.env;

export default {
	debug: DEBUG,
	apiUrl: `${API_URL}`,
	oidc: {
		clientId: `${OKTA_CLIENT_ID}`,
		issuer: `${OKTA_ISSUER}`,
		redirectUri: `${OKTA_REDIRECT_URI}`,
		scopes: ['openid', 'email', 'groups'],
		pkce: true
	},
};