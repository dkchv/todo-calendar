
"use strict";

var ViewBase = require('../../ViewBase');
var template = require('./ItemView.jade');

var ItemView = ViewBase.extend({
    template: template,
    className: 'todo-item'
});

module.exports = ItemView;
