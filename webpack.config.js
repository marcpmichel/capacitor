const path = require('path');

module.exports = function(env) {

var config = {
	mode: "development",
	target: "web",
	entry: path.join(__dirname, "js/art.js"),
	output: {
		path: path.join(process.cwd(),"www"),
		filename: "main.js",
		sourceMapFilename: "main.js.map"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
   				}
			}
		]
	}
};

return config;

}

