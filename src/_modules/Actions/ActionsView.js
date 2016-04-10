
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ActionsView.jade');
var QuickAddFormView = require('../QuickAddForm/QuickAddFormView');

var ActionsView = ViewBase.extend({
    template: template,
    className: 'todo-header-buttons',
    events: {
        'click .todo-header-buttons-add': 'onClickAdd'
    },

    regions: {
        quickAdd: '.todo-quick-add-form'
    },

    quickAddFormView: new QuickAddFormView(),

    onClickAdd: function () {
        console.log('ActionsView#onClickAdd', this.quickAddFormView);
        this.regions.quickAdd.append(this.quickAddFormView);
    }
});

module.exports = ActionsView;
