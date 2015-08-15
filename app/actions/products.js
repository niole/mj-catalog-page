'use strict';

var Constants = require('../constants');
var dispatcher = require('../dispatcher');

module.exports = {
  initialLoad: function (result) {
    dispatcher.handleAction({
      type: Constants.INITIAL_LOAD,
      data: result
    });
  }
};
