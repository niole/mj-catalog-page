'use strict';

exports.example = function *example () {
  this.status = 200;
  this.body = {
    hello: 'world'
  };
};
