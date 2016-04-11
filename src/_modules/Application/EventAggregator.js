
var _ = require('underscore');
var Backbone = require('backbone');

var EventAggregator = {};
_.extend(EventAggregator, Backbone.Events);

module.exports = EventAggregator;
