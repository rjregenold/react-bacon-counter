var Toolbar = require("./toolbar.js");
var State   = require("./state.js");

var _       = require("underscore");
var React   = require("react");


var App = React.createClass({
  getInitialState: function() {
    return {
      number: this.props.initialNumber
    };
  },

  componentWillMount: function() {
    this.props.stateProperty.onValue(_.bind(function(val) {
      this.setState({ number: val }, _.bind(function() { 
        this.props.saveNumber(val); 
      }, this));
    }, this));
  },

  render: function() {
    return React.createElement("div",
      null,
      React.createElement("span", 
        null, 
        this.state.number
      ), 
      React.createElement(Toolbar, {
        stepStream: this.props.stepStream,
        stepModStream: this.props.stepModStream
      })
    );
  }
});

React.render(
  React.createElement(App, State), 
  document.getElementById("js-app-mount")
);
