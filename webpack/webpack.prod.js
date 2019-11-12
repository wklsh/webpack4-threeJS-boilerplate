const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const OfflinePlugin = require("offline-plugin");

module.exports = merge(common, {
	mode: "production",

	devtool: "none",

	output: {
		path: path.resolve(__dirname, "../build/dist"),
		filename: "js/[chunkhash:8].js",
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
			}),

			new OptimizeCSSAssetsPlugin(),
		],
		splitChunks: {
			chunks: "all",
		},
	},

	plugins: [
		new CleanWebpackPlugin({
			path: path.resolve(__dirname, "../build/dist"),
		}),

		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			gifsicle: {
				// lossless gif compressor
				optimizationLevel: 9,
			},
			pngquant: {
				// lossy png compressor, remove for default lossless
				quality: "75",
			},
			plugins: [
				imageminMozjpeg({
					// lossy jpg compressor, remove for default lossless
					quality: "75",
				}),
			],
		}),

		//  new OfflinePlugin(),

		new FaviconsWebpackPlugin({
			logo: "./src/favicon.png",
			prefix: "favicons/",
		}),
	],
});
