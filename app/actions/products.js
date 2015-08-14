'use strict';

var Constants = require('../constants');
var dispatcher = require('../dispatcher');

module.exports = {
  initialLoad: function () {
    dispatcher.handleAction({
      type: Constants.INITIAL_LOAD
    });
  }
};
