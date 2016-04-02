"use strict";

function Region() {
    this.$el = null;
}

Region.prototype.setEl = function($el) {
    this.$el = $el;
};

Region.prototype.show = function(component) {
    this.$el.empty();
    this.append(component);
};

Region.prototype.append = function(component) {
    component.view.render();
    this.$el.append(component.view.$el);
};

module.exports = Region;
