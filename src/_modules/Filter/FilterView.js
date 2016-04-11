"use strict";

var ViewBase = require('../ViewBase');
var template = require('./FilterView.jade');
var ResultView = require('./Result/ResultView');
var TodoModel = require('../Application/models/TodoModel');
//var Backbone = require('backbone');
var ResultCollection = require('./Result/ResultCollection');
var eventAggregator = require('../Application/EventAggregator');

var FilterView = ViewBase.extend({
    className: 'todo-filter',
    template: template,

    $input: null,
    resultView: null,
    resultCollection: new ResultCollection(),
    prevString: null,

    events: {
        'keyup .todo-filter-input': 'onChangeInput',
        //'blur .todo-filter-input': 'clear',
        'click .todo-filter-clear': 'clear'
    },

    initialize: function() {
        ViewBase.prototype.initialize.call(this);
        this.$input = this.$('.todo-filter-input');
        this.resultView = new ResultView({
            collection: this.resultCollection
        });
        eventAggregator.on('jumpToItem', this.onJump, this);
    },

    onJump: function () {
        this.clear();
    },

    onChangeInput: function () {
        var query = this.$input.val();
        if (query === this.prevString) { return; }
        this.prevString = query;

        if (!query.length) {
            this.resultView.hide();
        } else {
            var result = this.collection.getItemsForQuery(query)
            if (result.length) {
                this.resultCollection.reset(result);
                this.$el.append(this.resultView.$el);
            } else {
                this.resultView.hide();
            }

        }
    },

    clear: function () {
        console.log('FilterView#clear');
        this.$input.val('');
        this.prevString = '';
        this.resultView.hide();
    }
});

module.exports = FilterView;
