'use strict';

var StoreListenerMixin = function (stores) {
  return {
    getInitialState: function () {
      return this.getStateFromStores();
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

    _onChange: function (index) {
      var newState = this.getStateFromStores();

      if (this.getMutatedOnChangeState) {
        newState = this.getMutatedOnChangeState(newState);
      }

      this.setState(newState);
    }
  };
};

module.exports = StoreListenerMixin;
