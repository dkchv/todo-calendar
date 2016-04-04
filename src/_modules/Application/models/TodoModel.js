
"use strict";

var Backbone = require('backbone');

var TodoModel = Backbone.Model.extend({
    defaults: {
        title: 'Title',
        description: 'Description',
        date: new Date(),
        people: []
    }
});

module.exports = TodoModel;
