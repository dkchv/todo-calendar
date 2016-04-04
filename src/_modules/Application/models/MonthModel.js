
"use strict";

var Backbone = require('backbone');

var MonthModel = Backbone.Model.extend({
    initialize: function() {
        var today = new Date();
        this.set({ today: today });
        this.setNewDate(today);
    },

    incrementMonth: function () {
        var month = this.get('curMonth');
        var year = this.get('curYear');
        this.setNewDate(new Date(year, month+1, 1));
    },

    decrementMonth: function () {
        var month = this.get('curMonth');
        var year = this.get('curYear');
        this.setNewDate(new Date(year, month-1, 1));
    },

    setNewDate: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);
        var curMonthLocale = date.toLocaleString('ru-ru', {month: 'long'});

        this.set({
            curYear: year,
            curMonth: month,
            curFullDateLocale: curMonthLocale + ' ' + year,
            firstDay: firstDay,
            lastDay: lastDay,
            firstDayNumber: firstDay.getDay(),
            daysCount: lastDay.getDate()
        });
    },

    goToday: function () {
        var today = this.get('today');
        if (today.getMonth() !== this.get('curMonth') || today.getFullYear() !== this.get('curYear')) {
            this.setNewDate(today);
        }
    }
});

module.exports = MonthModel;
