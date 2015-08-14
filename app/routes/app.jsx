'use strict';

var _ = require('lodash');

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProductsActions = require('../actions/products');
var ProductsStore = require('../stores/products');
var ProductsListing = require('../components/ProductsListing');
var StoreListener = require('../mixins/store-listener');

// Load initial data into stores
ProductsActions.initialLoad();

var App = React.createClass({
  mixins: [StoreListener([ProductsStore])],

  getStateFromStores: function () {
    return {
      data: _.filter(ProductsStore.getData(), function(elem) {
        return (elem.isActive && (elem.photos.length > 0));
      })
    };
  },

  render: function () {
    return (
      <div className="meadow-app">
        <ProductsListing products={this.state.data} />

        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
