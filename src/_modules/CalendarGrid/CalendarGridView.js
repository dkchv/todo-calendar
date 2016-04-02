
var ViewBase = require('../ViewBase');
var template = require('./CalendarGrid.jade');

var CalendarGridView = ViewBase.extend({
    template: template,
    className: 'todo-calendar-content'
});

module.exports = CalendarGridView;
