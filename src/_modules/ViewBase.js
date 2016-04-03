"use strict";

var Backbone = require('backbone');
var Region = require('./Region');

var ViewBase = Backbone.View.extend({

    component: null,

    initialize: function(component) {
        this.component = component;
        this.render();
        this.initRegions();
    },

    rendered: false,

    render: function () {
        var data = {};
        if (this.model) {
            data = this.model.toJSON();
        }

        if (!this.rendered) {
            this.$el.html(this.template(data));
        }
        this.rendered = true;
        return this;
    },

    parentRegion: null,

    hide: function () {
        if (this.parentRegion) {
            this.parentRegion.hide();
        }
    },

    initRegions: function () {
        if (!this.regions) { return; }
        //extract regions
        for (var regionName in this.regions) {
            if (this.regions.hasOwnProperty(regionName)) {
                var className = this.regions[regionName];
                var $el = this.$(className);
                this.regions[regionName] = new Region($el);
            }
        }
    }
});

module.exports = ViewBase;
