// Support storing environment variables in a file named .env
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Read environment variables from .env, override environment vars if they are already set.
const ENV_FILE = path.resolve(__dirname, ".", ".env");
if (fs.existsSync(ENV_FILE)) {
	const envConfig = dotenv.parse(fs.readFileSync(ENV_FILE));
	Object.keys(envConfig).forEach((k) => {
		process.env[k] = envConfig[k];
		console.log(`${k}=${process.env[k]}`);
	});
}

const webpack = require("webpack");
const env = {};

// List of environment variables made available to the app
["OKTA_CLIENT_ID", "OKTA_ISSUER", "OKTA_REDIRECT_URI", "API_URL", "DEBUG"].forEach(function (key) {
	if (!process.env[key]) {
		throw new Error(
			`Environment variable ${key} must be set.`
		);
	}
	env[key] = JSON.stringify(process.env[key]);
});

// Added to angular's webpack config by @angular-builders/custom-webpack
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": env,
		}),
	],
};
