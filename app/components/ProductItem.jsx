'use strict';

var React = require('react');

var ProductItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    imagePath: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired
  },
  render: function() {
    return (
      <div className="column">
        <p>Name: {this.props.name}</p>
        <p>Description: {this.props.description}</p>
        <p>Price: {this.props.price}</p>
        <br />
        <br />
      </div>
    );
  }
});

module.exports = ProductItem;
