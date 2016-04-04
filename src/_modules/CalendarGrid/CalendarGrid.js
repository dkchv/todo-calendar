"use strict";

var CalendarGridView = require('./CalendarGridView');
var MonthCollection = require('./MonthCollection');

function CalendarGrid(monthModel, todoCollection, formAdd) {
    this.monthModel = monthModel;
    this.todoCollection = todoCollection;
    this.monthCollection = new MonthCollection(todoCollection, monthModel);

    this.view = new CalendarGridView({
        model: monthModel,
        collection: this.monthCollection,
        formAdd: formAdd
    });
}

module.exports = CalendarGrid;
