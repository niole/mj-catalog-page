'use strict';

require('./server/config');

var assetRev = require('broccoli-asset-rev');
var browserify = require('broccoli-browserify-cache');
var cleanCSS = require('broccoli-clean-css');
var compileStylus = require('broccoli-stylus-single');
var env = require('broccoli-env').getEnv();
var filterReact = require('broccoli-react');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var uglifyJavascript = require('broccoli-uglify-js');

var css = compileStylus(['app/styles', 'node_modules/nib/lib', 'node_modules/normalize.css'], 'app.styl', 'assets/meadow.css', {
  'include css': true
});

var js = new Funnel('app', {
  include: [/.js$/, /.jsx$/]
});

js = filterReact(js, {
  extensions: ['jsx'],
  transform: {
    harmony: true
  }
});

js = browserify(js, {
  entries: ['./main'],
  outputFile: 'assets/meadow.js',
  cache: !(env === 'production')
});

if (env === 'production') {
  css = cleanCSS(css);

  js = uglifyJavascript(js, {
    mangle: true,
    compress: true
  });
}

var finalTree = mergeTrees(['public', css, js]);

var assetOptions = {
  exclude: ['vendor/pdf.js', 'constants.js'],
  extensions: ['js', 'css', 'png', 'jpg', 'gif', 'ico', 'woff', 'ttf', 'svg', 'eot'],
  replaceExtensions: ['html', 'js', 'css']
};

var assetTree = assetRev(finalTree, assetOptions);

module.exports = assetTree;
