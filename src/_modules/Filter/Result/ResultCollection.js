"use strict";

var Backbone = require('backbone');
var TodoModel = require('../../Application/models/TodoModel');

var ResultCollection = Backbone.Collection.extend({
    model: TodoModel
});

module.exports = ResultCollection;
