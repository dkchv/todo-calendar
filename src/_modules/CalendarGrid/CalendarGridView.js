
"use strict";

var ViewBase = require('../ViewBase');
var $ = require('jquery');
var DayView = require('./Day/DayView');
var DayModel = require('./Day/DayModel');

var CalendarGridView = ViewBase.extend({
    className: 'todo-calendar-content',

    WEEK_CLASS: 'todo-calendar-week',

    days: [],
    emptyDays: [],

    itemAddFormView: null,

    initialize: function (options) {
        this.itemAddFormView = options.itemAddFormView;
        ViewBase.prototype.initialize.call(this, options);
        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'reset', this.onChangeDate);
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
        var firstDayNumber = (this.model.get('firstDayNumber') + 6) % 7;

        var weekDay, dayView, i, ii, $week;

        //fill in with emptys before month
        $week = $('<div />').addClass(this.WEEK_CLASS);
        this.$el.append($week);
        //if (firstDayNumber > -1) {
            for(i = 0, ii = firstDayNumber; i < ii; i++) {

                dayView = new DayView({
                    model: new DayModel()
                });

                $week.append(dayView.render().$el);
                this.emptyDays.push(dayView);
            }
        //}

        //fill in current month
        for(i = 0, ii = daysCount; i < ii; i++) {
            weekDay = (i + firstDayNumber) % 7;

            if (weekDay === 0) {
                $week = $('<div />').addClass(this.WEEK_CLASS);
                this.$el.append($week);
            }

            dayView = new DayView({
                model: new DayModel({
                    num: i+1,
                    weekend: weekDay > 4
                }),
                itemAddFormView: this.itemAddFormView
            });

            $week.append(dayView.render().$el);
            this.days.push(dayView);
        }

        //fill in with emptys after month
        for(i = weekDay, ii = 6; i < ii; i++) {

            dayView = new DayView({
                model: new DayModel({})
            });

            $week.append(dayView.render().$el);
            this.emptyDays.push(dayView);
        }

        //setToday
    },

    onChangeDate: function (collection) {
        this.clear();
        this.rendered = false;
        this.$el.empty();
        this.render();

        //parse collection
        for(var i = 0, ii = collection.length; i < ii; i++) {
            this.addActiveDay(collection.at(i));
        }
    },

    addActiveDay: function(model) {
        var date = model.get('date');
        var day = date.getDate();
        var view = this.days[day - 1];
        view.model.set({ item: model });
    },

    clear: function () {
        var i, ii;
        for(i = 0, ii = this.days; i < ii; i++) {
            this.days[i].remove();
        }
        this.days = [];
        for(i = 0, ii = this.days; i < ii; i++) {
            this.emptyDays[i].remove();
        }
        this.emptyDays = [];
        this.itemAddFormView.hide();
    },

    onAdd: function (model) {
        this.addActiveDay(model);
    }
});

module.exports = CalendarGridView;
