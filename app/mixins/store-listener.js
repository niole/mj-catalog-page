'use strict';

var ProductsActions = require('../actions/products');

var StoreListenerMixin = function (stores) {
  return {
    getInitialState: function () {
      ProductsActions.initialLoad();
      setTimeout(function() {
                  this.getStateFromStores()
      }.bind(this), 3000);
      return { data: [] };
    },

    componentDidMount: function () {
      for (var i = 0, l = stores.length; i < l; i++) {
        stores[i].addChangeListener(this._onChange);

      }
    },

    componentWillUnmount: function () {
      for (var i = 0, l = stores.length; i < l; i++) {
        stores[i].removeChangeListener(this._onChange);
      }
    },

    _onChange: function () {
      var newState = this.getStateFromStores();

      if (this.getMutatedOnChangeState) {
        newState = this.getMutatedOnChangeState(newState);
      }

      this.setState(newState);
    }
  };
};

module.exports = StoreListenerMixin;
