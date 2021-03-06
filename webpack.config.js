var path = require('path');
var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
]

var devTool;
var entry;
var output = {
  filename: 'bundle.js',
  path: path.join(__dirname, 'app', 'server', 'public'),
}

if (process.env.NODE_ENV === 'production') {

  var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true }
    })
  ]

  plugins = [...plugins, ...prodPlugins]

  devTool = 'source-map'

  entry = path.join(__dirname, 'app', 'client', 'index.js')

} else {

  var devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]

  plugins = [...plugins, ...devPlugins]

  devTool = 'eval-source-map'

  entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app', 'client', 'index.js')
  ]

  output.publicPath = 'http://localhost:8080/'
}

module.exports = {
  context: path.resolve(__dirname, 'app', 'client'),
	entry,
  output,
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
    ]
  },
	plugins,
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"],
    alias: {
      "Actions": path.resolve(__dirname, 'app', 'client', 'actions'),
      "APIs": path.resolve(__dirname, 'app', 'client', 'api'),
      "Components": path.resolve(__dirname, 'app', 'client', 'components'),
      "Reducers": path.resolve(__dirname, 'app', 'client', 'reducers'),
      "Styles": path.resolve(__dirname, 'app', 'client', 'styles'),
    }
  },
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'app', 'client'),
		publicPath: 'http://localhost:8080/',
		headers: {
			"Access-Control-Allow-Origin": "http://localhost:5000",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
			"Access-Control-Allow-Credentials": "true",
		}
	}
};
