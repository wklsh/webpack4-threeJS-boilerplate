const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");

module.exports = merge(common, {
	mode: "development",

	devServer: {
		host: "0.0.0.0",
		port: portFinderSync.getPort(8080),
		historyApiFallback: true,
		inline: true,
		progress: true,
		compress: true,
		contentBase: path.join(__dirname, "../src"),
		watchContentBase: true,
		hot: true,
		open: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},

	optimization: {
		namedModules: true,
	},

	devtool: "inline-source-map",
});
