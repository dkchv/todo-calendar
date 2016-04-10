
"use strict";

var template = require('./Day.jade');
var ViewBase = require('../../ViewBase');
var ItemView = require('../Item/ItemView');

var DayView = ViewBase.extend({
    template: template,

    ACTIVE_CLASS: 'todo-day-active',
    SELECTED_CLASS: 'todo-day-selected',

    $item: null,
    itemView: null,
    itemAddFormView: null,

    events: {
        'click': 'onClick'
    },

    initialize: function(options) {
        ViewBase.prototype.initialize.call(this);
        this.itemAddFormView = options.itemAddFormView;
        this.listenTo(this.model, 'change:item', this.onChangeItem);
        this.$item = this.$('.todo-item');
    },

    className: function () {
        var classes = ['todo-day'];

        if (this.model.get('weekend')) {
            classes.push('todo-day-weekend');
        }

        if (this.model.get('item')) {
            classes.push(this.ACTIVE_CLASS);
        }

        if (this.model.get('today')) {
            classes.push('todo-day-today');
        }

        if (!this.model.get('num')) {
            classes.push('todo-day-empty');
        }

        return classes.join(' ');
    },

    onChangeItem: function () {
        var item = this.model.get('item');

        if (item) {
            this.itemView = new ItemView({
                model: item
            });
            this.$item.append(this.itemView.render().$el);
        } else {
            this.itemView.$el.remove();
            this.itemView = null;
        }
        this.$el.toggleClass(this.ACTIVE_CLASS);
    },

    onClick: function () {
        if (!this.itemAddFormView) { return; }
        this.itemAddFormView.update({
            dayView: this,
            model: this.model
        });
    },

    deselect: function () {
        this.$el.removeClass(this.SELECTED_CLASS);
    },
    select: function () {
        this.$el.addClass(this.SELECTED_CLASS);
    }
});

module.exports = DayView;
