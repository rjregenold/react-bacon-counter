var _     = require("underscore");
var Bacon = require("baconjs").Bacon;
var ls    = require("local-storage");


var LS_KEY = "initial-number";
var initialNumber = ls.get(LS_KEY) || 0;

// expects functions of type: (a -> a) -> (a -> a)
var stepStream = new Bacon.Bus();

// expects functions of type: a -> a
var stepModStream = new Bacon.Bus();

var nextValue = stepModStream
                .toProperty(_.identity)
                .sampledBy(stepStream, function(g, f) { 
                  return f(g);
                });

var stateProperty = nextValue.scan(initialNumber, function(x, f) { return f(x); });

function saveNumber(val) {
  ls(LS_KEY, val);
}

module.exports = {
  stepModStream: stepModStream,
  stepStream: stepStream,
  stateProperty: stateProperty,
  initialNumber: initialNumber,
  saveNumber: saveNumber
};
