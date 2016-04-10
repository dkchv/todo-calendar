"use strict";

var $ = require('jquery');

function Region($el) {
    this.$el = $el;
    this.$df = $(document.createDocumentFragment());
}

Region.prototype.show = function(view) {
    this.append(view);
};

Region.prototype.hide = function() {
    this.$df.append(this.$el.children());
};

Region.prototype.append = function(view) {
    view.parentRegion = this;
    this.$el.append(view.render().$el);
};

module.exports = Region;
