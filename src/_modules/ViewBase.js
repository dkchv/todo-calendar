"use strict";

var Backbone = require('backbone');

var ViewBase = Backbone.View.extend({
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = ViewBase;
