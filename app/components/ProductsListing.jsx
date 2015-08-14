'use strict';

var _ = require('lodash');

var React = require('react');
var ProductItem = require('./ProductItem');

var ProductsListing = React.createClass({
  propTypes: {
    products: React.PropTypes.array.isRequired
  },
  listItems: function() {
    var chunked = _.chunk(this.props.products, 4);
    return _.map(chunked, function(chunk) {
      return (
        <div className="row">
          {_.map(chunk, function(elem) {
            return (
              <ProductItem
              name={elem.name}
              description={elem.description}
              price={elem.options[0].price}
              />
            );
          })}
        </div>
      );
    });
  },
  render: function () {
    return (
      <div className="ui four column grid">
        {this.listItems()}
      </div>
    );
  }
});

module.exports = ProductsListing;
