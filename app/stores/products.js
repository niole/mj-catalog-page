'use strict';

var _ = require('lodash');
var $ = require('jquery');

var Constants = require('../constants');
var BaseStore = require('./base');
var dispatcher = require('../dispatcher');

var _data = {};

function loadInitialData() {
  $.ajax({
    url:'/data.json',
    success: function(result) {
      _data = result.data;
    },
    async: true
  });
}

function getData() {
  return _data;
}

var ProductsStore = _.extend({}, BaseStore, {
  getData: getData
});

ProductsStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case Constants.INITIAL_LOAD:
      loadInitialData()
      break;
    default:
      // NO_OP
      break;
  }
});

module.exports = ProductsStore;
