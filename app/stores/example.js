'use strict';

var _ = require('lodash');

var BaseStore = require('./base');
var dispatcher = require('../dispatcher');


var ExampleStore = _.extend({}, BaseStore, {

});

ExampleStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    default:
  }
});

module.exports = ExampleStore;
