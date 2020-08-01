const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const autoprefixer = require('autoprefixer');
const GoogleFontsPlugin = require('google-fonts-plugin');

module.exports = {
	// js
	entry: {
		main: ['./src/main.js'],
		// lazy: ['./src/lazy.js'],
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@demo': path.resolve(__dirname, 'src/demo'),
			'@directives': path.resolve(__dirname, 'src/directives'),
			'@libs': path.resolve(__dirname, 'src/libs'),
			'@plugins': path.resolve(__dirname, 'src/plugins'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@style': path.resolve(__dirname, 'src/style'),
			'@views': path.resolve(__dirname, 'src/views'),
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].bundle.css',
						},
					},
					{ loader: 'extract-loader' },
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							// Prefer Dart Sass
							implementation: require('sass'),

							// See https://github.com/webpack-contrib/sass-loader/issues/804
							webpackImporter: false,
							sassOptions: {
								includePaths: ['./node_modules']
							},
						}
					}
				]
			}
		]
	},
	devServer: {
		open: false,
		hot: true,
		host: '0.0.0.0',
		port: 3690,
		historyApiFallback: true,// for vue router mode history
		// writeToDisk: true,
		watchOptions: {
			poll: true
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// inject: false, // for vue router mode history
		}),
		new CopyPlugin([
			{ from: 'static', to: 'static' },
			{ from: 'manifest.pwa.json', to: 'manifest.pwa.json' },
		]),
		new VueLoaderPlugin(),
		new GoogleFontsPlugin('./googlefonts.config.json'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			_: 'lodash',
			moment: 'moment',
			Vue: ['vue/dist/vue.esm.js', 'default'],
			firebase: 'firebase/app',
			mapState: ['vuex', 'mapState'],
			mapGetters: ['vuex', 'mapGetters'],
			mapMutations: ['vuex', 'mapMutations'],
			mapActions: ['vuex', 'mapActions'],
			lang: ['@libs/lang', 'lang'],
			constant: ['@libs/constants', 'constant'],
		}),
		new InjectManifest({
			swSrc: '@/service-worker.js',
			swDest: 'service-worker.js',
			maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
		}),
	],
};
