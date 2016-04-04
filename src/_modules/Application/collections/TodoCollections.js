
"use strict";

var Backbone = require('backbone');
var TodoModel = require('../models/TodoModel');

var TodoCollections = Backbone.Collection.extend({
    model: TodoModel
});

module.exports = TodoCollections;
