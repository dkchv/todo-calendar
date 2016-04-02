
var ViewBase = require('../ViewBase');
var template = require('./DateSelector.jade');

var DateSelectorView = ViewBase.extend({
    template: template,
    className: 'todo-date'
});

module.exports = DateSelectorView;
