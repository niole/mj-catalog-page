'use strict';

var _ = require('lodash');
var $ = require('jquery');

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var ProductsActions = require('../actions/products');
var ProductsStore = require('../stores/products');
var ProductsListing = require('../components/ProductsListing');
var StoreListener = require('../mixins/store-listener');
var SideNav = require('../CatalogSideNav');

// I wish we could override a mixin and call super.componentDidMount()....
$.ajax({
  url:'/data.json',
  success: function(response) {
    ProductsActions.initialLoad(response.data);
  },
  async: true
});

var App = React.createClass({
  mixins: [StoreListener([ProductsStore])],

  dataFilter: function(strainType, consumption, elt) {
  //returns boolean value
    if (strainType[0] === null && consumption[0] === null) {
      return true;
    }
    var canPush = false;
    if (strainType[0] && consumption[0]) {
      for (var i=0; i<strainType.length; i++) {
        var strain = strainType[i];
        for (var j=0; j<consumption.length; j++) {
        var mode = consumption[j];
          if (strain.category === elt[strain.attr[0]] &&
              mode.category === elt[mode.attr[0]][mode.attr[1]]) {
              canPush = true;
          }
        }
      }
    } else {
      if (strainType[0]) {
        _.forEach(strainType, function(strain) {
          if (strain.category === elt[strain.attr[0]][strain.attr[1]]) {
            canPush = true;
          }
        });
      }
      if (consumption[0]) {
        _.forEach(consumption, function(mode) {
          if (mode.category === elt[mode.attr[0]][mode.attr[1]]) {
            canPush = true;
          }
        });
      }
    }
    return canPush;
  },

  getStateFromStores: function() {
    this.initialState = arguments;
    this.strains = [];
    this.categories = [];
    this.setStrains = [];
    this.setCategories = [];

    var data = ProductsStore.getData()
    var sortState = ProductsStore.getSortState()

    this.groupBy = sortState.groupBy;
    var sorts = sortState.sorts;
    var ranges = sortState.ranges;

    // TODO: sort data based on sort state
    var updatedData =  _.filter(data, function(elem) {

        if (this.setStrains.indexOf(elem.strainType) === -1) {
          this.strains.push({attr: ['strainType'], category: elem.strainType});
          this.setStrains.push(elem.strainType);


        }
        if (this.setCategories.indexOf(elem.category.name) === -1) {
          this.categories.push({attr: ['category','name'], category: elem.category.name});
          this.setCategories.push(elem.category.name);
        }


        return (
          (elem.isActive && (elem.photos.length > 0))
            &&
            this.dataFilter(this.groupBy.strainType, this.groupBy.consumption, elem)
            );
      }.bind(this)).sort(function(a, b) {
        if ( sorts.price ) {
          if ( sorts.price === 1 ) {
            //ascending
            return a.options.price.toFixed(2) - b.options.price.toFixed(2)
          }
          if ( sorts.price === -1 ) {
            //descending
            if (a.options.price.toFixed(2) - b.options.price.toFixed(2) > 0) {
              return -1;
            }
            else if (a.options.price.toFixed(2) - b.options.price.toFixed(2) < 0) {
              return 1;
            } else {
              return 0;
            }
          }
        } else {
          return a.categoryId - b.categoryId;
        }
      }) || []

    return {
      data: updatedData,
      strains: this.setStrains,
      categories: this.setCategories
    };
  },

  render: function () {
    return (
      <div className="meadow-app">
        <SideNav
          setcategories={this.state.categories}
          setstrains={this.state.strains}
          chemicals={['cbd','thc']}
         />
        <ProductsListing products={this.state.data} />

        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
