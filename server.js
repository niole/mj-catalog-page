'use strict';

require('./server/config');
var nconf = require('nconf');

var koa = require('koa');
var path = require('path');
var router = require('koa-router');
var staticCache = require('koa-static-cache');

var errorHandler = require('./server/middleware/error-handler');
var routes = require('./server/routes');
var singlePage = require('./server/middleware/single-page');

var files = {};
var app = koa();

app.name = 'Meadow Interview';
app.poweredBy = false;

app.use(errorHandler);

app.use(router(app));
routes.setup(app);

app.use(singlePage(files));

app.use(staticCache(path.join(__dirname, 'dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}, files));

files['/index.html'].cacheControl = 'no-cache';

app.listen(nconf.get('PORT'));

module.exports = app;
