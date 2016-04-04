
"use strict";

var AppView = require('./ApplicationView');
var Filter = require('../Filter/Filter');
var Actions = require("../Actions/Actions");
var DateSelector = require('../DateSelector/DateSelector');
var CalendarGrid = require('../CalendarGrid/CalendarGrid');
var MonthModel = require('./models/MonthModel');
var TodoCollection = require('./collections/TodoCollections');
var stubTodo = require('./stubTodo');
var FormAdd = require('../ItemAddForm/ItemAddForm');

function Application() {

    //models
    this.monthModel = new MonthModel();

    //collections
    this.todoCollection = new TodoCollection();

    //views
    this.appView = new AppView();

    //components
    this.filter = new Filter();
    this.actions = new Actions();
    this.formAdd = new FormAdd();
    this.dateSelector = new DateSelector(this.monthModel);
    this.calendarGrid = new CalendarGrid(this.monthModel, this.todoCollection, this.formAdd);
}

Application.prototype.start = function() {
    this.appView.regions.calendar.append(this.dateSelector);
    this.appView.regions.calendar.append(this.calendarGrid);
    this.appView.regions.header.append(this.actions);
    this.appView.regions.header.append(this.filter);
    this.appView.show();

    this.todoCollection.push(stubTodo);
};

module.exports = Application;
