"use strict";

var DateSelectorView = require('./DateSelectorView');

function DateSelector(monthModel) {
    this.monthModel = monthModel;

    this.view = new DateSelectorView({
        model: monthModel
    });
}

module.exports = DateSelector;
