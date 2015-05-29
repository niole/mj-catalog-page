'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ExampleStore = require('../stores/example');
var HelloWorld = require('../components/hello-world');
var StoreListener = require('../mixins/store-listener');

var App = React.createClass({
  mixins: [StoreListener([ExampleStore])],

  getStateFromStores: function () {
    return {

    };
  },

  render: function () {
    return (
      <div className="meadow-app">
        <HelloWorld />

        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
