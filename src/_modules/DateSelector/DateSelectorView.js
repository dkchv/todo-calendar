
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./DateSelector.jade');

var DateSelectorView = ViewBase.extend({
    template: template,
    className: 'todo-date',

    $date: null,

    initialize: function (options) {
        ViewBase.prototype.initialize.call(this, options);
        this.render();
        this.$date = this.$('.todo-date-date');
        this.listenTo(this.model, 'change:curFullDateLocale', this.onChangeDate);
    },

    events: {
        'click .todo-date-next': 'onNext',
        'click .todo-date-prev': 'onPrev',
        'click .todo-date-today': 'onToday'
    },

    onNext: function () {
        this.model.incrementMonth();
    },

    onPrev: function () {
        this.model.decrementMonth();
    },

    onToday: function () {
        this.model.goToday();
    },

    onChangeDate: function () {
        this.$date.html(this.model.get('curFullDateLocale'));
    }
});

module.exports = DateSelectorView;
