'use strict';

/* eslint no-path-concat: 0 */

var nconf = require('nconf');

nconf.env('__');

var env = nconf.get('NODE_ENV') || 'development';

nconf.file({ file: __dirname + '/' + env + '.json' });

/*
 * Default configuration.
 * Overridable via two methods:
 *   - Environment variables
 *   - Environment specific json (Example: /config/production.json)
 */

nconf.defaults({
  NODE_ENV: 'development',
  PORT: 9000,

  domain: 'localhost:9000'
});
