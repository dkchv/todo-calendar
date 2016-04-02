
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ActionsView.jade');

var ActionsView = ViewBase.extend({
    template: template,
    className: 'todo-header-buttons',
    events: {
        'click .todo-header-buttons-add': 'onClickAdd'
    },

    regions: {
        quickAdd: '.todo-header-buttons-quick-add-form'
    },

    onClickAdd: function () {
        this.component.showQuickAddForm();
    }
});

module.exports = ActionsView;
