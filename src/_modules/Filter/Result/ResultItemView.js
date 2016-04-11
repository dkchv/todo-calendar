
"use strict";

var ViewBase = require('../../ViewBase');
var template = require('./ResultItemView.jade');
var eventAggregator = require('../../Application/EventAggregator');

var ResultItemView = ViewBase.extend({
    template: template,
    className: 'todo-result-item',

    events: {
        'click': 'onClick'
    },

    templateHelpers: {
        getDate: function () {
            var currentDate = this.model.get('date');
            var month = currentDate.getMonth();
            var day = currentDate.getDate();

            //alter month
            var monthStr = currentDate.toLocaleString('ru-ru', {month: 'long'});
            if (month === 2 || month === 7) {
                //март, август
                monthStr += 'а';
            } else {
                monthStr = monthStr.slice(0, -1) + 'я';
            }

            return day + ' ' + monthStr;
        }
    },

    onClick: function () {
        console.log('ResultItemView#onClick');
        eventAggregator.trigger('jumpToItem', this.model);
    }
});

module.exports = ResultItemView;
