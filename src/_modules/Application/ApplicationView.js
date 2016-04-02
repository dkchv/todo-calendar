/**
 * Created by szdv on 27.03.2016.
 */

"use strict";

var Backbone = require('backbone');
var template = require('./Application.jade');
var $ = require('jquery');
var Region = require('./Region');

var ApplicationView = Backbone.View.extend({

    className: 'todo-app',
    id: 'todo-app',
    template: template,

    $target: $('script[data-todo="todo"]'),

    regions: {
        header: '.todo-header-body',
        calendar: '.todo-calendar'
    },

    initialize: function() {
        this.render();
        this.initRegions();
    },

    initRegions: function () {
        for (var regionName in this.regions) {
            if (this.regions.hasOwnProperty(regionName)) {
                var newRegion = new Region();
                var className = this.regions[regionName];
                var $el = this.$(className);

                console.log('ApplicationView#initRegions', this.regions, className, $el);

                newRegion.setEl($el);
                this.regions[regionName] = newRegion;
            }
        }
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },
    show: function () {
        this.$el.insertAfter(this.$target);
    }
});

module.exports = ApplicationView;
