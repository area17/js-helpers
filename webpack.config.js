module.exports = {
	entry: "./test/test.js",
	output: {
			path: __dirname + '/test',
			filename: "testBundle.js"
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	},
	target: "node"
};