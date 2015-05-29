'use strict';

var broccoli = require('broccoli');
var childProcess = require('child_process');
var ncp = require('ncp');
var rimraf = require('rimraf');
var sane = require('sane');
var SaneWatcher = require('broccoli-sane-watcher');

/*
 * Spawn the node server child
 */

var child = null;

function restartServer() {
  if (child) {
    child.kill('SIGTERM');
  }

  console.log('Re-starting koa server...');

  child = childProcess.spawn('node', ['--harmony-generators', 'server.js']);

  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  child.stderr.on('data', function(data) {
    console.log(data.toString());
  });
}

var serverWatcher = sane(__dirname + '/server', {

});

serverWatcher.on('all', function (type, filepath) {
  console.log('File changed: ' + filepath);

  restartServer();
});

/*
 * Create the broccoli watcher
 */

var tree = broccoli.loadBrocfile();
var builder = new broccoli.Builder(tree);
var watcher = new SaneWatcher(builder, {
  verbose: true
});

watcher.on('change', didChange);
watcher.on('error', didError);

function didChange(results) {
  new Promise(function (resolve, reject) {
    rimraf('dist', function (err) {
      if (err) return reject(err);
      resolve();
    });
  }).then(function () {
    return new Promise(function (resolve, reject) {
      ncp(results.directory, 'dist', {
        dereference: true,
        stopOnErr: true,
        limit: 2
      }, function (err) {
        if (err) return reject(err);

        resolve(results);
      });
    });
  }).then(function () {
    restartServer();
  }).catch(function (err) {
    console.log(err);
  });
}

function didError(error) {
  console.log(error);
}

/*
 * Handle close errors
 */

process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);

function cleanupAndExit() {
  serverWatcher.close();

  builder.cleanup().finally(function () {
    if (child) {
      child.kill('SIGTERM');
    }

    process.exit(1);
  });
}
