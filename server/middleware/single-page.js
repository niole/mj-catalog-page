'use strict';

/* eslint curly: 0, eqeqeq: 0 */

module.exports = function singlePage (files) {
  return function *singlePage (next) {
    if (!this.idempotent || this.body != null || this.status != 404) return;

    if (!files[this.path]) {
      this.path = '/index.html';
    } else {
      this.set('Access-Control-Allow-Origin', '*');
    }

    yield *next;
  };
};
