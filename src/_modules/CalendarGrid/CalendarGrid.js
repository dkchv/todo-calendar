"use strict";

var CalendarGridView = require('./CalendarGridView');

function CalendarGrid(monthModel) {
    this.monthModel = monthModel;
    this.view = new CalendarGridView({
        model: monthModel
    });
}

module.exports = CalendarGrid;
