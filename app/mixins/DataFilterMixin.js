'use strict';

var _ = require('lodash');

var FilterSortMixin = function () {
  //categories = [{attr: relative path to object in data object, category: name of category grouping by}, ..]
  return {
    dataFilter: function(categories, dataArray) {
      //returns boolean value
      var copyArray = dataArray;
      while (copyArray.length > 0) {
        currData = copyArray.pop();
        var canPush = true;
        _.forEach(categories, function(attrObject) {
          if (dataArray[attrObject.attr] !== attrObject.category) {
            canPush = false;
            return false;
          }
        });
        if (canPush) {
          return true;
        }
      }
    }

  };
};

module.exports = FilterSortMixin;
