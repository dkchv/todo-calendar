
"use strict";

var ViewBase = require('../../ViewBase');
var template = require('./ResultView.jade');
var ResultItemView = require('./ResultItemView');
var eventAggregator = require('../../Application/EventAggregator');

var ResultView = ViewBase.extend({
    template: template,
    className: 'todo-filter-result',

    itemViews: [],

    initialize: function() {
        ViewBase.prototype.initialize.call(this);
        this.listenTo(this.collection, 'reset', this.onReset);
        eventAggregator.on('jumpToItem', this.onJump, this);
    },

    onJump: function () {
        this.hide();
    },

    render: function () {
        if (!this.rendered) {
            this.buildList();
        }
        this.rendered = true;
        return this;
    },

    buildList: function () {
        this.$el.empty();

        for(var i = 0, ii = this.collection.length; i < ii; i++) {
            var todoModel = this.collection.at(i);
            var itemView = new ResultItemView({
                model: todoModel
            });
            this.itemViews.push(itemView);
            this.$el.append(itemView.$el);
        }

    },

    onReset: function () {
        this.rendered = false;
        this.render();
    },

    hide: function () {
        this.collection.reset();
        ViewBase.prototype.hide.call(this);
    }
});

module.exports = ResultView;
