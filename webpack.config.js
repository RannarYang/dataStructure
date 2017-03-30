var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var isProd = false;
module.exports = {
	context: __dirname,
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
		{
			test: /\.ts$/,
			use: [
				{loader: 'ts-loader'}
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {importLoaders: 1}
				},
				{
					loader: 'postcss-loader'
				}
			]
		},{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
            	loader: 'postcss-loader'
            },{
                loader: "less-loader" // compiles Less to CSS
            }]
        },{
            test: /\.html$/,
            use: [{
                loader: "html-loader" // creates style nodes from JS strings
            }]
        },{
            test: /\.ejs$/,
            use: [{
                loader: "ejs-loader" // creates style nodes from JS strings
            }]
        },{
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                // loader: "file-loader", // creates style nodes from JS strings
	            //    query: {
	            	// 	name: 'assets/[name]-[hash:5].[ext]'
	            	// },
            	loader: "url-loader", // creates style nodes from JS strings
        	    query: {
        	    	limit: 10000,
            		name: 'assets/[name]-[hash:5].[ext]'
            	},
            }, {
            	loader: "image-webpack-loader"
            }]
        }],
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: path.resolve(__dirname, 'node_modules'),
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['latest']
				}
			}, 
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?importLoaders = 1!postcss-loader'
			}, 
			{
				test: /\.less$/, 
				loader: 'style-loader!css-loader?importLoaders = 1!postcss-loader!less-loader'
			}

		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function() {
					return [
						require('autoprefixer')({
							broswers: ['last 5 versions']
						})
					]
				}
			}
		})
	]
	// ,
	// // 模块热更新
	// devServer: {
 //        contentBase: './src',
 //        historyApiFallback: true,
 //        port: 3022,
 //        compress: isProd,
 //        inline: !isProd,
 //        hot: !isProd, //开发模式支持热更新
 //        stats: {
 //          assets: true,
 //          children: false,
 //          chunks: false,
 //          hash: false,
 //          modules: false,
 //          publicPath: false,
 //          timings: true,
 //          version: false,
 //          warnings: true,
 //          colors: {
 //            green: '\u001b[32m',
 //          }
 //        },
 //    }
}
