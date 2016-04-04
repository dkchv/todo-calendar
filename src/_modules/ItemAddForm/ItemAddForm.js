"use strict";

var ItemAddFormView = require('./ItemAddFormView');
var TodoModel = require('../Application/models/TodoModel');

function ItemAddForm() {
    this.view = new ItemAddFormView({
        component: this
    });
    this.dayView = null;
}

ItemAddForm.prototype.update = function(options) {
    if (this.dayView === options.dayView) {
        //hide
        this.item = null;
        this.dayView.deselect();
        this.view.remove();
        this.dayView = null;
    } else {

        if (this.dayView) {
            //hide previous
            this.dayView.deselect();
        }
        //show
        this.dayView = options.dayView;
        this.dayView.select();
        this.view.model = options.item || new TodoModel();
        this.view.rendered = false;
        this.dayView.$el.append(this.view.render().$el);
    }
};

module.exports = ItemAddForm;
