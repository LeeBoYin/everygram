// split webpack config files: https://hacksoft.io/split-your-webpack-configuration-development-and-production/
function buildConfigFunc(env) {
	console.log('env', env);
	if (env.development) {
		return require('./webpack.config.dev.js')(env);
	} else if (env.watch) {
		return require('./webpack.config.watch.js')(env);
	} else if (env.production) {
		return require('./webpack.config.prod.js')(env);
	} else if (env.analyze) {
		return require('./webpack.config.analyze.js')(env);
	} else {
		console.log('Wrong webpack build parameter.')
	}
}
module.exports = buildConfigFunc;
