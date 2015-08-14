'use strict';

var React = require('react');

var ProductItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired
  },
  render: function() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
});

module.exports = ProductItem;
