const path = require("path");
const merge = require("webpack-merge");
const prod = require("./webpack.prod.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dotenv = require("dotenv").config({ path: `./env/${process.env.NODE_ENV}.env` }).parsed;
const S3Plugin = require("webpack-s3-plugin");

module.exports = merge(prod, {
	output: {
		path: path.resolve(__dirname, `../build/deploy-${process.env.NODE_ENV}`),
	},

	plugins: [
		new CleanWebpackPlugin({
			path: path.resolve(__dirname, `../build/deploy-${process.env.NODE_ENV}`),
		}),

		new S3Plugin({
			s3Options: {
				accessKeyId: dotenv.S3_ACCESS_KEY,
				secretAccessKey: dotenv.S3_SECRET_KEY,
				region: dotenv.S3_REGION,
			},
			s3UploadOptions: {
				Bucket: dotenv.S3_BUCKET,
			},
			cloudfrontInvalidateOptions: {
				DistributionId: dotenv.CLOUDFRONT_DISTRIBUTION_ID,
				Items: ["/*"],
			},
		}),
	],
});
