
"use strict";

var ViewBase = require('../ViewBase');
var $ = require('jquery');
var DayView = require('./Day/DayView');
var Backbone = require('backbone');

var CalendarGridView = ViewBase.extend({
    className: 'todo-calendar-content',

    WEEK_CLASS: 'todo-calendar-week',

    days: [],
    emptyDays: [],

    formAdd: null,

    initialize: function (options) {
        this.formAdd = options.formAdd;
        ViewBase.prototype.initialize.call(this, options);
        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'reset', this.onReset);
    },

    render: function () {
        if (!this.rendered) {
            this.buildGrid();
        }
        this.rendered = true;
        return this;
    },

    buildGrid: function () {
        var daysCount = this.model.get('daysCount');
        var firstDayNumber = this.model.get('firstDayNumber') - 1;

        var weekDay, dayView, i, ii;

        //fill in with emptys before month
        var $week = $('<div />').addClass(this.WEEK_CLASS);
        this.$el.append($week);
        for(i = 0, ii = firstDayNumber; i < ii; i++) {

            dayView = new DayView({
                model: new Backbone.Model({})
            });

            $week.append(dayView.render().$el);
            this.emptyDays.push(dayView);
        }

        //fill in curent month
        for(i = 0, ii = daysCount; i < ii; i++) {
            weekDay = (i + firstDayNumber) % 7;

            if (weekDay === 0) {
                $week = $('<div />').addClass(this.WEEK_CLASS);
                this.$el.append($week);
            }

            dayView = new DayView({
                model: new Backbone.Model({
                    num: i+1,
                    //item: this.collection.getItemForDay(i+1),
                    weekend: weekDay > 4
                }),
                formAdd: this.formAdd
            });

            $week.append(dayView.render().$el);
            this.days.push(dayView);
        }

        //fill in with emptys after month
        for(i = weekDay, ii = 6; i < ii; i++) {

            dayView = new DayView({
                model: new Backbone.Model({})
            });

            $week.append(dayView.render().$el);
            this.emptyDays.push(dayView);
        }

        ////fill in with models
        //for(i = 0, ii = this.collection.length; i < ii; i++) {
        //    var model = this.collection.at(i);
        //    console.log('CalendarGridView#buildGrid', model);
        //}
    },

    onReset: function (a) {
        console.log('CalendarGridView#onReset', a);
    },

    onAdd: function (model) {
        var date = model.get('date');
        var day = date.getDate();
        var view = this.days[day - 1];
        view.model.set({ item: model});

        console.log('CalendarGridView#onAdd', model);
    }
});

module.exports = CalendarGridView;
