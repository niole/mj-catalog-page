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

  foldL: function(dataObject, paths) {
    if (paths.length === 0) {
      return dataObject;
    } else {
      dataObject = dataObject[paths.slice(0,1)];
      return this.foldL(dataObject, paths.slice(1,paths.length));
    }
  },

  inRange: function(title, range, elt) {
    /* range - the chosen range
     * title - attribute pointing to range
     * returns bool
     */
    var match = true;
    if (title === "chems") {
      //TODO: check if real proportion inside proposed proportion range with std of +/-10
      var Thc_Cbdmg = _.map(range, function(chem) {
          var mgs = this.foldL(elt, chem.attr);
          if (mgs === "" || mgs === null) {
            match = false;
            return null;
          }
          return mgs.match(/\d+/g);
      }.bind(this));
      if (match === false) {
        return match;
      }
      //if there is someting in the range,
      //keep going

      var sum = _.reduce(Thc_Cbdmg, function(a,b) {
        return a+b;
      });
      var chemPercents = _.map(Thc_Cbdmg, function(chem) {
                          if(chem) {
                            return (chem*100)/sum;
                          }
                          console.log('letting through null vals in chem range processor');
                          return null;
                        });
      //check if real percents inside those proposed
      //with chem slider
      if (chemPercents[0] < range[0].category-10 ||
          chemPercents[1] > range[1].category+10 ) {
        match = false;
        return match;
      }
    }
    return match;
  },

  dataFilter: function(groupByObj, elt) {
    /*
     * returns boolean value
     * if all groups null, return true for all
     * when 1 or more groups not null, then element must match
     * at least 1 from each specified grouping
    */
    var totalGs = 0;
    var nullGs = 0;
    var keep = 0;
    for (var g in groupByObj) {
      totalGs += 1;

      if (groupByObj[g][0]) {   //if filter data exists for group

        if (typeof(groupByObj[g][0].category) !== 'string') {

          /* Distinguishes if number or string:
           * i.e. range or category groupBy group.
           * Only dealing with chems for now
           */

          if (this.inRange(g, groupByObj[g], elt)) {
            keep += 1;
          }
        } else {
          //iterate over each category attr in grouping objects
          //and look for matches
          //if one match, break loop and increment keep by 1
          for (var i=0; i<groupByObj[g].length; i++) {
            if (groupByObj[g][i].category === this.foldL(elt, groupByObj[g][i].attr)) {
              keep += 1;
              break;
            }
          }
        }
      } else {
        nullGs += 1;
      }
    }
    if (totalGs === nullGs) {
      //if all is null, then return true for all
      return true;
    } else if (keep === totalGs-nullGs) {
      return true;
    } else {
      return false;
    }
  },

  getStateFromStores: function() {
    var data = ProductsStore.getData()
    var sortState = ProductsStore.getSortState()
    this.strains = [];
    this.categories = [];
    this.setStrains = [];
    this.setCategories = [];
    this.groupBy = sortState.groupBy;
    this.chems = this.groupBy.chems;

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
            this.dataFilter(this.groupBy, elem)
            );
      }.bind(this)).sort(function(a, b) {
          return a.categoryId - b.categoryId;
      }) || []

    return {
      data: updatedData,
      strains: this.setStrains,
      categories: this.setCategories,
      chems: this.chems

    };
  },

  render: function () {
    return (
      <div className="meadow-app">
        <SideNav
          setcategories={this.state.categories}
          setstrains={this.state.strains}
          chems={this.state.chems}
         />
        <ProductsListing products={this.state.data} />

        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
