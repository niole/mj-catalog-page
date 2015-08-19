'use strict';
var Slider = require('react-slider');
var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var ProductsActions = require('./actions/products');
var ProductsStore = require('./stores/products');


var SideNav = React.createClass({
  propTypes: {
    setcategories: React.PropTypes.array.isRequired,
    setstrains: React.PropTypes.array.isRequired,
    chems: React.PropTypes.array.isRequired
  },

  componentDidMount: function() {
    this.sortState = ProductsStore.getSortState();
  },

  getInitialState: function() {
    return {thc: this.props.chems[0], cbd: this.props.chems[1]};
  },

  handleMode: function(mode) {
    var modeArray = _.map(this.sortState.groupBy.consumption, function(cat) {
                                                          if (cat) {
                                                            return cat.category;
                                                          } else {
                                                            return null;
                                                          }
                                                          });

      if ( $("#"+mode).is(":checked") ) {
        if (modeArray.indexOf(mode) === -1) {
          if (modeArray[0] === null) {
            this.sortState.groupBy.consumption[0] = {category: mode, attr: ["category","name"]};
          } else {
            this.sortState.groupBy.consumption.push({category: mode, attr: ["category","name"]});
          }

        }
      } else if ( $("#"+mode).is(":checked") === false) {
        if (modeArray.indexOf(mode) > -1) {
          for (var i=0; i < modeArray.length; i++) {
            if ( modeArray[i] === mode ) {
              this.sortState.groupBy.consumption.splice(i,1);
              if (this.sortState.groupBy.consumption.length === 0) {
                this.sortState.groupBy.consumption.push(null);
              }
            }
          }
        }
       }
      ProductsActions.updateSortState(this.sortState);
  },

  handleStrain: function(strain) {
    var strainArray = _.map(this.sortState.groupBy.strainType, function(cat) {
                                                            if (cat) {
                                                              return cat.category
                                                            } else {
                                                              return null;
                                                            }
                                                          });

      if ( $('#'+strain).is(":checked" )) {
        if (strainArray.indexOf(strain) === -1) {
          if (strainArray[0] === null) {
            this.sortState.groupBy.strainType[0] = {category: strain, attr: ["strainType"]};
          } else {
            this.sortState.groupBy.strainType.push({category: strain, attr: ["strainType"]});
          }
        }
      } else if ( $("#"+strain).is(":checked") === false) {
        if (strainArray.indexOf(strain) > -1) {
          for (var i=0; i < strainArray.length; i++) {
            if ( strainArray[i] === strain ) {
              this.sortState.groupBy.strainType.splice(i,1);
              if (this.sortState.groupBy.strainType.length === 0) {
                this.sortState.groupBy.strainType.push(null);
              }
            }
          }
        }
      }
      ProductsActions.updateSortState(this.sortState);
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
    return (
      <div className="field">
        <Slider defaultValue={50} onAfterChange={this.setChems} onChange={this.thc} withBars>
          <div className="my-handle">{this.state.thc}/{this.state.cbd}</div>
        </Slider>
      </div>
    );
  },

  thc: function(num) {
    this.setState({thc: num, cbd: 100-num});
  },

  setChems: function(num) {
    this.sortState.ranges.chems[0] = num;
    this.sortState.ranges.chems[1] = 100-num;
    ProductsActions.updateSortState(this.sortState);
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
          <div className="header">THC / CBD</div>
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
