"use strict";

var Backbone = require('backbone');
var Region = require('./Region');
var $ = require('jquery');

var ViewBase = Backbone.View.extend({

    $df: $(document.createDocumentFragment()),


    initialize: function() {
        //options = options || {};
        //this.component = options.component;
        this.render();
        this.initRegions();
    },

    rendered: false,

    render: function (force) {
        if (this.rendered && !force) { return this; }
        this.rendered = true;

        var data = {};
        if (this.model) {
            data = this.model.toJSON();
        }

        if (this.templateHelpers) {
            //bind helpers to data
            for(var helper in this.templateHelpers) {
                if(this.templateHelpers.hasOwnProperty(helper)) {
                    data[helper] = this.templateHelpers[helper].bind(this);
                }
            }
        }

        this.$el.html(this.template(data));
        return this;
    },

    parentRegion: null,

    hide: function () {
        if (this.parentRegion) {
            this.parentRegion.hide();
        } else {
            this.$df.append(this.$el);
        }
    },

    initRegions: function () {
        if (!this.regions) { return; }
        //extract regions
        for (var regionName in this.regions) {
            if (this.regions.hasOwnProperty(regionName)) {
                var className = this.regions[regionName];
                var $el = className === 'el' ? this.$el : this.$(className);

                this.regions[regionName] = new Region($el);
            }
        }
    }
});

module.exports = ViewBase;
