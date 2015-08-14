'use strict';

var _ = require('lodash');

var React = require('react');
var ProductItem = require('./ProductItem');

var ProductsListing = React.createClass({
  propTypes: {
    products: React.PropTypes.array.isRequired
  },
  listItems: function() {
    return _.map(this.props.products, function(elem) {
      return (
        <ProductItem
          name={elem.name}
          description={elem.description}
          price={elem.options[0].price}
        />
      );
    });
  },
  render: function () {
    return (
      <div className="hello-world">
        {this.listItems()}
      </div>
    );
  }
});

module.exports = ProductsListing;
