
"use strict";

var AppView = require('./ApplicationView');

function Application() {
    this.view = new AppView();
}

Application.prototype.init = function() {

};

Application.prototype.start = function() {
    this.view.render();
};

module.exports = Application;
