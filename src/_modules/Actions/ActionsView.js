
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ActionsView.jade');

var ActionsView = ViewBase.extend({
    template: template,
    className: 'todo-header-buttons'
});

module.exports = ActionsView;
