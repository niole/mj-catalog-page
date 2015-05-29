'use strict';

/* eslint curly: 0, eqeqeq: 0 */

module.exports = function *errorHandler (next) {
  try {
    yield *next;

    // Throw statuses set by koa && koa-router
    if (this.response.status == 404 && !this.response.body) this.throw(404);
    if (this.status == 405) this.throw(405);
    if (this.status == 500) this.throw(500);
    if (this.status == 501) this.throw(501);
  } catch (err) {
    this.status = err.status || 500;

    this.body = { error: {
      message: require('http').STATUS_CODES[this.status]
    }};
  }
};
