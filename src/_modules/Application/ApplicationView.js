/**
 * Created by szdv on 27.03.2016.
 */

"use strict";

var template = require('./Application.jade');
var $ = require('jquery');
var ViewBase = require('../ViewBase');

var ApplicationView = ViewBase.extend({

    className: 'todo-app',
    id: 'todo-app',
    template: template,

    $target: $('script[data-todo="todo"]'),

    regions: {
        header: '.todo-header-body',
        calendar: '.todo-calendar'
    },

    show: function () {
        this.$el.insertAfter(this.$target);
    }
});

module.exports = ApplicationView;
