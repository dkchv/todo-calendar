"use strict";

var $ = require('jquery');

function Region($el) {
    this.$el = $el;
    this.$df = $(document.createDocumentFragment());
}

Region.prototype.show = function(component) {
    this.append(component);
};

Region.prototype.hide = function() {
    this.$df.append(this.$el.children());
};

Region.prototype.append = function(component) {

    component.view.parentRegion = this;
    this.$el.append(component.view.render().$el);
};

module.exports = Region;
