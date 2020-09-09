# TypeScript with React and Webpack project sample

## Webpack setup
Let's set up a simple webpack starter project.

Create a folder:\
`mkdir webpack-simple-setup`

Initialize npm:\
`npm init`

Install `webpack` and `webpack-cli` as dev dependencies:\
`npm i -D webpack webpack-cli`

Add an `src` folder and a file `index.js` with a simple alert.


Add a script for building the app (this will run webpack):\
``` "build": "webpack --mode production" ``` in `package.json`

Webpack builds the app for production, it includes the necessary optimizations.
When this script is run, weback will process and bundle the source code from `src` folder into a single file named: `main.js` and it will store this file in `dist` folder.
It inlcudes defaults for the configuration.

`npm run build`

Check the js bundle and dist folder.

Create `index.html` in `src`.

We want webpack to copy this file to the dist when we build the app. For this we use a plugin called: `htmp-webpack-plugin`.

Install it as a dev dependency like so:\
`npm i -D html-webpack-plugin`

Now we should initialize this plugin, so create the config file for webpack : `webpack.config.js`

Add the plugin to the plugins array and initialize it there.
```
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
}
```

This plugin adds the script tags and reference the right bundles.


Use `webpack-dev-server` to run the app locally. 
It rebuilds the app every time a file changes.\
It's distributed as a separate package:

`npm i -D webpack-dev-server`

Add:\
` "start": "webpack-dev-server --open --mode development" ` in `package.json`.

And start the app:\
`npm start`

## Setting up TypeScript using `ts-loader`

Install the TypeScipt compiler and the ts-loader webpack loader as dev dependencies:\
`npm i -D typescript ts-loader`

Create the tsconfig.json file to start configuring TypeScript for the project:

```
{
    "compilerOptions": {
        "target": "es6",
        "module": "es6",
        "strict": true
    }
}
```
The way the files are processed are as folows:\
.ts files -> webpack -> ts-loader -> webpack -> bundle

Rename the source files from *.js to *ts.

Modify the webpack.config.js:

```
module.exports = {
    entry: "./src/index.ts",
    resolve:{
        extensions: ['.js', '.ts', '.tsx'],
    },
    module:{
        rules:[{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
```

## Adding React

Intall `react` and `react-dom` as normal dependencies:\
`npm i -S react react-dom`

React doesn't include type definitions so we have to installed them from the types repo as dev dependencies:\
`npm i -D @types/react @types/react-dom`

By default TypeScript doesn't understand `jsx` syntax and doesn't know how to handle it by default.\
We can add an option to the compile options in `tsconfig.json` to enable it:\
`"jsx": "react"`



## Adding a source map
We can tell webpack to autogenerate a map which the browser can use to map the error location in the code it executes (js) to the location in the original source file (.tx, .tsx).\
A source map allows the browser to map a line number from compiled code to the line number from the source code.

The simplest way to enable source map geneartion in webpack is to use the `devtool` option.
In `webpack.config.js`: 
```
 devtool: "eval-source-map"
```
Also, if using `ts-loader` instead of `babel-loader` add the following in `tsconfig.json`:\
`"sourceMap": true`
