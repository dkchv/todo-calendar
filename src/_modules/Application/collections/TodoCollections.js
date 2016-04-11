
"use strict";

var Backbone = require('backbone');
var TodoModel = require('../models/TodoModel');

var TodoCollections = Backbone.Collection.extend({
    model: TodoModel,

    getItemsForMonth: function (month) {
        return this.filter(function (item) {
            var date = item.get('date');
            return date >= month.get('firstDay') && date < month.get('lastDay');
        });
    },

    getItemsForQuery: function (query) {
        var re = new RegExp(query, 'gi');
        return this.filter(function (item) {
            var title = item.get('title');
            return re.test(title);
        });
    }
});

module.exports = TodoCollections;
