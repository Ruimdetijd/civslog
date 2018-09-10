const webpack = require('webpack')
module.exports = {
	entry: {
		bundle: "./src/client/index.tsx",
	},
	mode: "development",
	output: {
		filename: "[name].js",
		path: __dirname + "/dist/client",
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				CIVSLOG_SERVER: JSON.stringify(process.env.CIVSLOG_SERVER)
			}
		})
	],
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				options: { configFile: "tsconfig.json" },
			},
		]
	}
};
