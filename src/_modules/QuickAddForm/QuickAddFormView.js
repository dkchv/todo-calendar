
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./QuickAddForm.jade');

var QuickAddFormView = ViewBase.extend({
    template: template,

    events: {
        'click .todo-quick-add-form-close': 'onCloseClick'
    },

    onCloseClick: function () {
        this.hide();
    }
});

module.exports = QuickAddFormView;
