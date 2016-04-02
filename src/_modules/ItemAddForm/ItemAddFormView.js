
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ItemAddFormView.jade');

var ItemAddFormView = ViewBase.extend({
    template: template,
    className: 'todo-form-add'
});

module.exports = ItemAddFormView;
