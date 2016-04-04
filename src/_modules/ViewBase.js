"use strict";

var Backbone = require('backbone');
var Region = require('./Region');

var ViewBase = Backbone.View.extend({

    component: null,

    initialize: function(options) {
        options = options || {};
        this.component = options.component;
        this.render();
        this.initRegions();
    },

    rendered: false,

    render: function () {
        if (this.rendered) { return this; }
        this.rendered = true;

        var data = {};
        if (this.model) {
            data = this.model.toJSON();
        }
        this.$el.html(this.template(data));
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
