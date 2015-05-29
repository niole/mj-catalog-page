'use strict';

var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

var AppRouter = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

AppRouter.run(function (Handler) {
  React.render(<Handler />, document.getElementById('meadow-root'));
});
