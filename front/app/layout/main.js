var Marionette = require("backbone.marionette");

var tpl = require("./main.hbs");

module.exports = Marionette.LayoutView.extend({
  template: tpl,
  id: "app",
  
  regions: {
    header: "header",
    content: ".content",
    footer: "footer"
  }


});