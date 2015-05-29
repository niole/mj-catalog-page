'use strict';

var proxy = require('./routes/proxy');

exports.setup = function setup (app) {
  app.post('/api/example', proxy.example);
};
