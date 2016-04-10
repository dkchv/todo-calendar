
"use strict";

var ViewBase = require('../../ViewBase');
var template = require('./ItemView.jade');

var ItemView = ViewBase.extend({
    template: template,
    className: 'todo-item',

    initialize: function(options) {
        this.listenTo(this.model, 'change', this.onChange);
        ViewBase.prototype.initialize.call(this, options);
    },

    onChange: function () {
        this.render(true);
    }
});

module.exports = ItemView;
