
"use strict";

var AppView = require('./ApplicationView');
var Filter = require('../Filter/Filter');
var Actions = require("../Actions/Actions");
var DateSelector = require('../DateSelector/DateSelector');
var CalendarGrid = require('../CalendarGrid/CalendarGrid');

function Application() {
    this.appView = new AppView();
    this.filter = new Filter();
    this.actions = new Actions();
    this.dateSelector = new DateSelector();
    this.calendarGrid = new CalendarGrid();
}

Application.prototype.start = function() {
    this.appView.regions.calendar.append(this.dateSelector);
    this.appView.regions.calendar.append(this.calendarGrid);
    this.appView.regions.header.append(this.actions);
    this.appView.regions.header.append(this.filter);
    this.appView.show();
};

module.exports = Application;
