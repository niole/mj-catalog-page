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
          id={elem.id}
          categoryName={elem.category.name}
          description={elem.description}
          imagePath={elem.photos[0].sizes["180"]}
          price={elem.options[0].price}
        />
      );
    });
  },
  render: function () {
    var containerStyle = {
      width: "75%",
      backgroundColor: "whitesmoke",
      paddingTop: "2rem",
      position: "absolute",
      right: "0px"
    };
    return (
      <div className="ui container" style={containerStyle}>
        <div className="ui four column grid">
          <div className="row">
            {this.listItems()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductsListing;
