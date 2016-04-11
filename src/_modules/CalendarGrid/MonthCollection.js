
"use strict";

var Backbone = require('backbone');
var TodoModel = require('../Application/models/TodoModel');

var MonthCollection = Backbone.Collection.extend({
    model: TodoModel,

    constructor: function (todoCollection, monthModel) {
        this.todoCollection = todoCollection;
        this.listenTo(todoCollection, 'add', this.onAdd);

        this.monthModel = monthModel;
        this.listenTo(monthModel, 'change', this.onChange);
        Backbone.Collection.apply(this, arguments);
    },

    initialize: function() {
        this.reset(this.todoCollection.getItemsForMonth(this.monthModel));
    },

    onChange: function () {
        this.reset(this.todoCollection.getItemsForMonth(this.monthModel));
    },

    onAdd: function (model) {
        var date = model.get('date');
        if (date > this.monthModel.get('firstDay') && date < this.monthModel.get('lastDay')) {
            console.log('MonthCollection#onAdd');
            this.add(model);
        }

    }
});

module.exports = MonthCollection;
