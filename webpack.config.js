//@ts-check

"use strict";

const path = require("path");
const webpack = require('webpack');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const baseConfig = {
  mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "nosources-source-map",
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
};

// Config for extension source code (to be run in a Node-based context)
/** @type WebpackConfig */
const extensionConfig = {
  ...baseConfig,
  target: "node",
  entry: {
    "extension-node": "./src/extension.ts", // source of the node extension main file
    "test/suite/index-node": "./src/test/suite/index-node.ts", // source of the node extension test runner
    "test/suite/extension.test": "./src/test/suite/extension.test.ts", // create a separate file for the tests, to be found by glob
    "test/runTest": "./src/test/runTest", // used to start the VS Code test runner (@vscode/test-electron)
  },
  externals: ["vscode"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].js',
    libraryTarget: "commonjs2",
  },
};

// Config for extension source code (to be run in a Node-based context)
/** @type WebpackConfig */
const webExtensionConfig = {
  ...baseConfig,
  target: "webworker",
  entry: {
		'extension-web': './src/extension.ts',
		"test/suite/index-web": "./src/test/suite/index-web.ts",
	},
  output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist'),
		libraryTarget: 'commonjs',
		devtoolModuleFilenameTemplate: '../../[resource-path]'
	},
  resolve: {
		mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
		extensions: ['.ts', '.js'], // support ts-files and js-files
		alias: {
			// provides alternate implementation for node module and source files
		},
		fallback: {
			// Webpack 5 no longer polyfills Node.js core modules automatically.
			// see https://webpack.js.org/configuration/resolve/#resolvefallback
			// for the list of Node.js core module polyfills.
			'assert': require.resolve('assert')
		}
  },
  plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1 // disable chunks by default since web extensions must be a single bundle
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser', // provide a shim for the global `process` variable
		}),
	],
};

// Config for webview source code (to be run in a web-based context)
/** @type WebpackConfig */
const webviewConfig = {
  ...baseConfig,
  target: ["web", "es2020"],
  entry: "./src/webview/main.ts",
  experiments: { outputModule: true },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webview.js",
    libraryTarget: "module",
    chunkFormat: "module",
  },
};

module.exports = [extensionConfig,webExtensionConfig, webviewConfig];
