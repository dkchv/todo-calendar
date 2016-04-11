
"use strict";

var ViewBase = require('../ViewBase');
var template = require('./ItemAddFormView.jade');
var TodoModel = require('../Application/models/TodoModel');
var DayModel = require('../CalendarGrid/Day/DayModel');

var ItemAddFormView = ViewBase.extend({
    template: template,
    className: 'todo-form-add',

    dayView: null,
    monthModel: null,
    todoCollection: null,

    events: {
        'click': 'onClick',
        'click .todo-form-add-close': 'onClose',
        'click .todo-form-add-button-submit': 'onSubmit',
        'click .todo-form-add-button-delete': 'onDelete'
    },

    initialize: function(options) {
        options = options || {};
        this.dayView = options.dayView;
        this.monthModel = options.monthModel;
        this.todoCollection = options.todoCollection;
        ViewBase.prototype.initialize.call(this, options);
    },

    onClick: function () {
        return false;
    },

    onClose: function () {
        this.hide();
    },

    onSubmit: function () {
        var title = this.$('.todo-form-add-input-title').val();
        if (!title) {
            return;
        }

        var people = this.$('.todo-form-add-input-people').val();
        people = people.length ? people.split(',').map(Function.prototype.call, String.prototype.trim) : [];

        var item = this.model.get('item') || new TodoModel({
                date: this.getCurrentDate()
            });

        item.set({
            title: title,
            date: item.get('date'),
            people: people,
            description: this.$('.todo-form-add-input-description').val()
        });

        this.todoCollection.add(item);
        this.hide();
    },

    onDelete: function () {
        var item = this.model.get('item');
        if (item) {
            this.todoCollection.remove(item);
        }
        this.model.set({ item: null});
        this.hide();
    },

    hide: function () {
        if (this.dayView) {
            //hide previous
            this.dayView.deselect();
        }
        this.dayView = null;
        ViewBase.prototype.hide.call(this);
    },

    update: function(options) {
        options = options || {};

        if (this.dayView) {
            //hide previous
            this.dayView.deselect();
        }

        if (this.dayView === options.dayView) {
            //hide on second click
            this.hide();
        } else {
            //show
            this.dayView = options.dayView;
            this.dayView.select();
            this.model = options.model;
            this.rendered = false;
            this.dayView.$el.append(this.render().$el);
        }
    },

    //TODO: refactor DayModel with full date
    getCurrentDate: function () {
        var currentDate;
        var year, month, day;
        var item = this.model.get('item');
        if (!item) {
            year = this.monthModel.get('curYear');
            month = this.monthModel.get('curMonth');
            day  = this.model.get('num') || 0;
            currentDate = new Date(year, month, day);
        } else {
            currentDate = item.get('date');
        }

        return currentDate;
    },

    templateHelpers: {
        currentDate: function () {
            var currentDate = this.getCurrentDate();
            var month = currentDate.getMonth();
            var day = currentDate.getDate();
            var year = currentDate.getFullYear();

            //alter month
            var monthStr = currentDate.toLocaleString('ru-ru', {month: 'long'});
            if (month === 2 || month === 7) {
                //март, август
                monthStr += 'а';
            } else {
                monthStr = monthStr.slice(0, -1) + 'я';
            }

            return day + ' ' + monthStr + ' ' + year + ' г.';
        },
        peoples: function () {
            var item = this.model.get('item');
            if (!item) { return ''; }
            var people = item.get('people');
            return people ? people.join(', ') : '';
        },
        getTitle: function () {
            var item = this.model.get('item');
            return item ? item.get('title') : '';
        },
        getDescription: function () {
            var item = this.model.get('item');
            return item ? item.get('description') : '';
        }
    }
});

module.exports = ItemAddFormView;
