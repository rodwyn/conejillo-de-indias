'use strict';

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';
var webpack = require('webpack');
var sprite = require('sprite-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var glob = require('glob');
var distPath = '/dist/';
var viewsPath = './app/views/';
var views = glob.sync(viewsPath + '*.njk');

module.exports = function makeWebpackConfig () {

	var config = {};

	config.cache = true;

	config.entry = {
		bundle: path.resolve(__dirname, 'app/scripts/app.js'),
	};

	config.output = {
		path: __dirname + distPath,
		publicPath: isProd ? '/' : 'http://127.0.0.1:8080/',
		filename: isProd ? 'js/[name].[hash].js' : '[name].js',
		chunkFilename: isProd ? '[name].[hash].js' : '[name].js'
	};

	config.resolve = {
		extensions: ['.ts', '.js', '.tsx', '.jsx', 'json', '']
	};

	config.module = {
		loaders: [{
				test: /\.js$/,
				exclude: [/node_modules/],
				loader: 'babel',
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
				exclude: [/node_modules/],
			}, {
    		test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
    		loader: 'file-loader?publicPath=/&name=fonts/[name].[ext]',
				exclude: [/node_modules/],
			}, {
			  test: /\.(png|jpg|jpeg|gif)$/,
			  loader:'file?publicPath=/&name=images/[name].[ext]',
				exclude: [/node_modules/],
			}, {
				test: /\.json$/,
				loader: 'json',
				exclude: [/node_modules/],
			}, {
        test: /\.ts$/,
        loader: 'ts-loader!eslint-loader',
				exclude: [/node_modules/]
      }, {
				test: /\.(njk|nunjucks)$/,
				loader: 'nunjucks-html?' + JSON.stringify({
					'searchPaths': [viewsPath],
				}),
				exclude: [/node_modules/],
			},
		]
	};

	config.postcss = [
		autoprefixer({
      browsers: ['last 3 versions', '> 1%']
    })
  ];

	config.sasslint = {
	  configFile: '.sass-lint.yml'
	};

	config.eslint = {
    configFile: '.eslintrc'
  };

	config.devServer = {
    contentBase: './app/',
    stats: {
	    hash: false,
	    version: false,
	    timings: true,
	    assets: false,
	    chunks: false,
	    modules: false,
	    reasons: true,
	    children: false,
	    source: false,
	    errors: true,
	    errorDetails: false,
	    warnings: true,
	    publicPath: false
		},
		inline: true
  };

	config.plugins = [];

  config.plugins.push(
		new sprite({
			'source': path.resolve(__dirname, 'app/images/sprites'),
			'imgPath': path.resolve(__dirname, 'app/sprites/'),
			'format': 'png',
			'spriteName': 'sprite',
			'connector': '-',
			'baseName': 'base',
			'base': 'icon',
			'cssPath': path.resolve(__dirname, 'app/styles/'),
			'prefix': 'icon',
			'processor': 'scss',
			'bundleMode': 'one',
		}),
		new ExtractTextPlugin(isProd ? 'css/[name].[hash].css' : '[name].css'),
		new StyleLintPlugin({
			configFile: '.stylelintrc',
			context: './app/styles/custom',
			failOnError: false,
			glob: '**/*.s?(a|c)ss',
			ignoreFiles: [],
			ignorePlugins: ['extract-text-webpack-plugin'],
			quiet: true,
		}),
		new HtmlWebpackPlugin({
			template: 'app/views/index.html',
			inject: 'body'
		})
  );

  if (isProd) {
		config.devtool = 'cheap-module-source-map';

    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
			new CopyWebpackPlugin([{
 				from: __dirname + '/app/images/',
				to: './images/',
 			}], {
				ignore: ['sprites/**']
			})
    );
	} else {
		config.devtool = 'eval';
	}

  return config;
}();
