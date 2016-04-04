
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ItemAddFormView.jade');
var $ = require('jquery');

var ItemAddFormView = ViewBase.extend({
    template: template,
    className: 'todo-form-add',

    dayView: null,

    events: {
        'click': 'onClick',
        'click .todo-form-add-close': 'onClose'
    },

    initialize: function(options) {
        options = options || {};
        var item = options.item;
        this.dayView = options.dayView;
        console.log('ItemAddFormView#initialize', item);
    },

    onClick: function () {
        return false;
    },

    onClose: function () {
        this.component.update({ dayView: this.dayView });
    }
});

module.exports = ItemAddFormView;
