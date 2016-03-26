// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');
var Link = require('../_modules/link/link');

$(function() {
  var a = new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
});
