var _     = require("underscore");
var React = require("react");


// ---
// step functions

function always(n) {
  return function(f) {
    return function(x) {
      return n;
    };
  };
}

function step(n) {
  return function(f) {
    return function(x) {
      return x + f(n);
    };
  };
}

function halve(f) {
  return function(x) {
    return x / 2;
  };
};


// ---
// step modifier functions

function stepMod(n) {
  return function(x) {
    return x * n;
  };
}

module.exports = React.createClass({
  render: function() {
    return React.createElement("div",
      null,
      React.createElement("button", {
        onClick: _.bind(function() {
          this.props.stepStream.push(step(-1));
        }, this)
      }, "-"),
      React.createElement("button", {
        onClick: _.bind(function() {
          this.props.stepStream.push(step(1));
        }, this)
      }, "+"),
      React.createElement("span", null,
        "Count by: ",
        React.createElement("select", {
          onChange: _.bind(function (e) {
            this.props.stepModStream.push(stepMod(e.target.value));
          }, this)
        }, 
          React.createElement("option", { value: 1 }, "ones"),
          React.createElement("option", { value: 2 }, "twos"),
          React.createElement("option", { value: 3 }, "threes"),
          React.createElement("option", { value: 10 }, "tens")
        )
      ),
      React.createElement("div", null,
        React.createElement("button", {
          onClick: _.bind(function() {
            this.props.stepStream.push(always(0));
          }, this)
        }, "Reset"),
        React.createElement("button", {
          onClick: _.bind(function() {
            this.props.stepStream.push(halve);
          }, this)
        }, "Halve")
      )
    );
  }
});
