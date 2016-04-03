
"use strict";

//var Backbone = require('backbone');
var template = require('./Day.jade');
var ViewBase = require('../ViewBase');

var DayView = ViewBase.extend({
    template: template,
    className: function () {
        var classes = ['todo-day'];

        if (this.model.get('item')) {
            classes.push('todo-day-active');
        }
        if (!this.model.get('num')) {
            classes.push('todo-day-empty');
        }

        return classes.join(' ');
    }
});

module.exports = DayView;
