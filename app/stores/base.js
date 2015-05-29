'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var constants = require('../constants');

var BaseStore = _.extend({}, EventEmitter.prototype, {
  loading: false,
  apiError: null,

  isLoading: function () {
    return this.loading;
  },

  emitChange: function () {
    /*
     * Emits the change event *asynchronously*
     * This is done async to avoid error swalling in promises.
     * emitChange was being called from a then handler, which then
     * causes render() to be called. If an error happened in render,
     * it would be swallowed by the promise (i.e. throw error in this.state.array.map)
     */

    var self = this;

    setTimeout(function () {
      self.emit(constants.CHANGE_EVENT);
    }, 0);
  },

  addChangeListener: function (callback) {
    this.on(constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(constants.CHANGE_EVENT, callback);
  }
});

module.exports = BaseStore;
