"use strict";

var ActionsView = require('./ActionsView');
var QuickAddForm = require('../QuickAddForm/QuickAddForm');


function Actions() {
    this.view = new ActionsView({ component: this });
    this.quickAddForm = new QuickAddForm();
}

Actions.prototype.showQuickAddForm = function() {
    this.view.regions.quickAdd.append(this.quickAddForm);
};

module.exports = Actions;
