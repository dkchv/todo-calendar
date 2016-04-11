
"use strict";

var AppView = require('./ApplicationView');
var FilterView = require('../Filter/FilterView');
var ActionsView = require("../Actions/ActionsView");
var DateSelectorView = require('../DateSelector/DateSelectorView');
var CalendarGridView = require('../CalendarGrid/CalendarGridView');
var MonthModel = require('./models/MonthModel');
var TodoCollection = require('./collections/TodoCollections');
var MonthCollection = require('../CalendarGrid/MonthCollection');
var stubTodo = require('./stubTodo');
var ItemAddFormView = require('../ItemAddForm/ItemAddFormView');
var TodoModel = require('./models/TodoModel');
var DayModel = require('../CalendarGrid/Day/DayModel');

function Application() {

    //models
    this.monthModel = new MonthModel();

    //collections
    this.todoCollection = new TodoCollection();
    this.monthCollection = new MonthCollection(this.todoCollection, this.monthModel);

    //views
    this.appView = new AppView();
    this.filterView = new FilterView({
        collection: this.todoCollection
    });
    this.actionsView = new ActionsView();
    this.itemAddFormView = new ItemAddFormView({
        model: new DayModel(),
        monthModel: this.monthModel,
        todoCollection: this.todoCollection
    });
    this.dateSelector = new DateSelectorView({ model: this.monthModel });
    this.calendarGridView = new CalendarGridView({
        model: this.monthModel,
        collection: this.monthCollection,
        itemAddFormView: this.itemAddFormView
    });
}

Application.prototype.start = function() {
    this.appView.regions.calendar.append(this.dateSelector);
    this.appView.regions.calendar.append(this.calendarGridView);
    this.appView.regions.header.append(this.actionsView);
    this.appView.regions.header.append(this.filterView);
    this.appView.show();

    this.todoCollection.push(stubTodo);
};

module.exports = Application;
