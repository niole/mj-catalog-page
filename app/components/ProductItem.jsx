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
    var itemStyle = {
      padding: "0 0 0 0",
      margin: "2rem 2rem"
    };
    var hiddenStyle = {
      width: "100%",
      height:"auto",
      maxHeight:"100%",
      wordWrap: "break-word",
      whiteSpace: "normal",
      overflowY: "scroll"
    };
    var imgStyle = {
      width:"100%",
      height:"auto"
    };
    return (
      <div className="ui move up reveal column" style={itemStyle} >
        <div className="visible content" style={{width: "100%"}} >
          <img src={this.props.imagePath} className="ui small image" style={imgStyle} />
        </div>
        <div className="hidden content" style={hiddenStyle} >
          <h1>{this.props.name}</h1>
          <div>{this.props.description}</div>
          <div className="ui label">
            <i className="dollar icon"></i> {(this.props.price * 0.01).toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductItem;
