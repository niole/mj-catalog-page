'use strict';

var _ = require('lodash');
var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = _.extend(new Dispatcher(), {
  handleAction: function (action) {
    this.dispatch(action);
  }
});

module.exports = AppDispatcher;
