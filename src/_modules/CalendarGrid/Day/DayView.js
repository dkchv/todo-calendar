
"use strict";

//var Backbone = require('backbone');
var template = require('./Day.jade');
var ViewBase = require('../../ViewBase');
var ItemView = require('../Item/ItemView');

var DayView = ViewBase.extend({
    template: template,

    ACTIVE_CLASS: 'todo-day-active',
    SELECTED_CLASS: 'todo-day-selected',

    $item: null,
    itemView: null,

    $formAdd: null,
    formAdd: null,

    events: {
        'click': 'onClick'
    },

    initialize: function(options) {
        ViewBase.prototype.initialize.call(this, options);
        this.formAdd = options.formAdd;
        this.listenTo(this.model, 'change:item', this.onChangeItem);
        this.render();
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
            var itemView = new ItemView({
                model: this.model.get('item')
            });
            this.$item.append(itemView.render().$el);
        } else {
            //this.itemView.destroy();
            this.itemView = null;
            this.$item = null;
        }
        this.$el.toggleClass(this.ACTIVE_CLASS);
        console.log('DayView#onChangeItem', this.$item);
    },

    onClick: function () {
        var item = this.model.get('item');
        this.formAdd.update({
            dayView: this,
            item: item
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
