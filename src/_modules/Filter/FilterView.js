"use strict";

var ViewBase = require('../ViewBase');
var template = require('./FilterView.jade');

var FilterView = ViewBase.extend({
    className: 'todo-filter',
    template: template
});

module.exports = FilterView;
