/**
 * Created by szdv on 27.03.2016.
 */

"use strict";

var Backbone = require('backbone');
var template = require('./Application.jade');
var $ = require('jquery');

var ApplicationView = Backbone.View.extend({

    className: 'todo-app',
    id: 'todo-app',
    template: template,

    $body: $('body'),

    initialize: function() {
        this.$el.insertAfter($('script[data-todo="todo"]'));
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = ApplicationView;
