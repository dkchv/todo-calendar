
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./CalendarGrid.jade');
var $ = require('jquery');
var DayView = require('./DayView');
var Backbone = require('backbone');

var CalendarGridView = ViewBase.extend({
    //template: template,
    template: function () {},
    className: 'todo-calendar-content',

    WEEK_CLASS: 'todo-calendar-week',
    DAY_CLASS: 'todo-day',

    initialize: function (component) {
        this.render();
        this.buildGrid();
        ViewBase.prototype.initialize.call(this, component);
    },

    buildGrid: function () {
        var days = this.model.get('daysCount');
        var firstDayNumber = this.model.get('firstDayNumber') - 1;

        var weekDay;
        var $emptyDay, $day;
        var dayView;
        var i, ii;

        //fill in with emptys before month
        var $week = $('<div />').addClass(this.WEEK_CLASS);
        this.$el.append($week);
        for(i = 0, ii = firstDayNumber; i < ii; i++) {

            dayView = new DayView({
                model: new Backbone.Model({})
            });

            //$emptyDay = $('<div>empty</div>').addClass(this.DAY_CLASS);
            $week.append(dayView.render().$el);
        }

        //fill in curent month
        for(i = 0, ii = days; i < ii; i++) {
            weekDay = (i + firstDayNumber) % 7;

            if (weekDay === 0) {
                $week = $('<div />').addClass(this.WEEK_CLASS);
                this.$el.append($week);
            }

            dayView = new DayView({
                model: new Backbone.Model({
                    num: i+1,
                    item: new Backbone.Model({})
                })
            });

            $week.append(dayView.render().$el);
        }

        //fill in with emptys after month
        for(i = weekDay, ii = 6; i < ii; i++) {

            dayView = new DayView({
                model: new Backbone.Model({})
            });

            $week.append(dayView.render().$el);
        }
    }
});

module.exports = CalendarGridView;
