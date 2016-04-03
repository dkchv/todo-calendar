
var ViewBase = require('../ViewBase');
var template = require('./CalendarGrid.jade');

var CalendarGridView = ViewBase.extend({
    template: template,
    className: 'todo-calendar-content',

    initialize: function (component) {
        ViewBase.prototype.initialize.call(this, component);

        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var first = new Date(y, m, 0);
        var last = new Date(y,m+1,0).getDate();
        console.log('CalendarGridView#initialize');

    }
});

module.exports = CalendarGridView;
