'use strict';

var _ = require('lodash');
var $ = require('jquery');

var Constants = require('../constants');
var BaseStore = require('./base');
var dispatcher = require('../dispatcher');

var _data = {};

var _sortState = { active: {strainType: true, consumption: true, chems: false, price: false},
                  groupBy: {chems: [null, null],
                            strainType:[null],
                            consumption:[null],
                            price:[null, null]}
                  };

function getData() {
  return _data;
}

function getSortState() {
  return _sortState;
}

var ProductsStore = _.extend({}, BaseStore, {
  getData: getData,
  getSortState: getSortState
});

ProductsStore.dispatchToken = dispatcher.register(function (action) {
  switch (action.type) {
    case Constants.INITIAL_LOAD:
      _data = action.data;
      ProductsStore.emitChange();
      break;

    case Constants.UPDATE_SORT:
      _sortState = action.data;
      ProductsStore.emitChange();
      break;

    default:
      // NO_OP
      break;
  }
});

module.exports = ProductsStore;
