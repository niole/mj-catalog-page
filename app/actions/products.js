'use strict';

var Constants = require('../constants');
var dispatcher = require('../dispatcher');

module.exports = {

  initialLoad: function (result) {
    dispatcher.handleAction({
      type: Constants.INITIAL_LOAD,
      data: result
    });
  },

  updateSortState: function (newSortState) {
    //newSortState = {groupBy: {strainType:[array of strings],consumption:[array of category names],
                     //sorts:{price:+1 || -1, thc: +1||-1, cbd: +1||-1},
                    //ranges: {price: [,], thc:[,], cbd:[,]}}
    dispatcher.handleAction({
      type: Constants.UPDATE_SORT,
      data: newSortState
    });
  }

};
