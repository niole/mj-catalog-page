'use strict';

var _ = require('lodash');
var $ = require('jquery');

var React = require('react');
var ProductsActions = require('./actions/products');
var ProductsStore = require('./stores/products');


var SideNav = React.createClass({
  propTypes: {
    setcategories: React.PropTypes.array.isRequired,
    setstrains: React.PropTypes.array.isRequired,
    chemicals: React.PropTypes.array.isRequired
  },

  handleMode: function(mode) {
    var sortState = ProductsStore.getSortState();
    var modeArray = _.map(sortState.groupBy.consumption, function(cat) {
                                                          if (cat) {
                                                            return cat.category;
                                                          } else {
                                                            return null;
                                                          }
                                                          });

      if ( $("#"+mode).is(":checked") ) {
        if (modeArray.indexOf(mode) === -1) {
          if (modeArray[0] === null) {
            sortState.groupBy.consumption[0] = {category: mode, attr: ["category","name"]};
          } else {
            sortState.groupBy.consumption.push({category: mode, attr: ["category","name"]});
          }

        }
      } else if ( $("#"+mode).is(":checked") === false) {
        if (modeArray.indexOf(mode) > -1) {
          for (var i=0; i < modeArray.length; i++) {
            if ( modeArray[i] === mode ) {
              sortState.groupBy.consumption.splice(i,1);
              if (sortState.groupBy.consumption.length === 0) {
                sortState.groupBy.consumption.push(null);
              }
            }
          }
        }
       }
      ProductsActions.updateSortState(sortState);
  },

  handleStrain: function(strain) {
    var sortState = ProductsStore.getSortState();
    var strainArray = _.map(sortState.groupBy.strainType, function(cat) {
                                                            if (cat) {
                                                              return cat.category
                                                            } else {
                                                              return null;
                                                            }
                                                          });

      if ( $('#'+strain).is(":checked" )) {
        if (strainArray.indexOf(strain) === -1) {
          if (strainArray[0] === null) {
            sortState.groupBy.strainType[0] = {category: strain, attr: ["strainType"]};
          } else {
            sortState.groupBy.strainType.push({category: strain, attr: ["strainType"]});
          }
        }
      } else if ( $("#"+strain).is(":checked") === false) {
        if (strainArray.indexOf(strain) > -1) {
          for (var i=0; i < strainArray.length; i++) {
            if ( strainArray[i] === strain ) {
              sortState.groupBy.strainType.splice(i,1);
              if (sortState.groupBy.strainType.length === 0) {
                sortState.groupBy.strainType.push(null);
              }
            }
          }
        }
      }
      ProductsActions.updateSortState(sortState);
  },

  buildConsmptionModes: function() {
    return _.map(this.props.setcategories, function(mode) {
      return (
        <a className="item">
          <div className="ui checkbox">
            <input id={mode} value={mode} type="checkbox" name={mode} onChange={this.handleMode.bind(null,mode)}/>
            <label>{mode}</label>
          </div>
        </a>
      );
    }.bind(this));
  },
  buildStrainTypes: function() {
    return _.map(this.props.setstrains, function(strain) {
      return (
        <a className="item">
          <div className="ui checkbox">
            <input id={strain} value={strain} type="checkbox" name={strain} onChange={this.handleStrain.bind(null, strain)}/>
            <label>{strain}</label>
          </div>
        </a>
      );
    }.bind(this));
  },

  buildChemicalSliders: function() {
    return  _.map(this.props.chemicals, function(compound) {
        return (
          <div className="field">
            <div className="ui slider checkbox">
              <input type="radio" name="throughput" checked="checked"/>
              <label>0</label>
              <input type="radio" name="throughput" checked="checked"/>
              <label>100</label>
              <label>{compound}</label>
            </div>
          </div>
      );
    });

  },

  render: function() {
    var headerStyle = {
                      position: "fixed",
                      backgroundColor: "whitesmoke",
                      zIndex: "4",
                      height: "100%"
                      };

    return (
    <span>
      <div className="ui vertical menu" style={headerStyle}>

        <div className="item">
          <div className="header">Chemical Types</div>
          <div className="menu">
            <div className="ui form">
              <div className="grouped fields">
                {this.buildChemicalSliders()}
              </div>
            </div>
          </div>
        </div>

        <div clasName="item">
          <div className="header">Strain Types</div>
          <div className="menu">
            {this.buildStrainTypes()}
          </div>
        </div>

        <div clasName="item">
          <div className="header">Consumption Modes</div>
          <div className="menu">
            {this.buildConsmptionModes()}
          </div>
        </div>
      </div>
    </span>
    );
  }
});

module.exports = SideNav;
