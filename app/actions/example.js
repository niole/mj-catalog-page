'use strict';

var dispatcher = require('../dispatcher');

module.exports = {
  exampleAction: function () {
    dispatcher.handleAction({
      type: 'STRING_CONSTANT'
    });
  }
};
