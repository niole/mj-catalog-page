'use strict';

var _ = require('lodash');
var $ = require('jquery');

var React = require('react');

var Header = React.createClass({
  propTypes: {
    title: React.PropTypes.array.isRequired
  },
  render: function() {
    var headerStyle = {
                      position: "fixed",
                      backgroundColor: "whitesmoke",
                      zIndex: "4",
                      width: "100%"
                      };

    return (
      <div className="ui secondary pointing menu" style={headerStyle}>
        <a className="item">
          Home
        </a>
        <a className="item">
          Messages
        </a>
        <a className="item active">
          Friends
        </a>
        <div className="right menu">
          <a className="ui item">
            Logout
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Header;
