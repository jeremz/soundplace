tplRoom = require("./room.hbs");

module.exports = Backbone.View.extend({

	tagName : "div",
	id: "room",

	events: {
		"click .loginForm" : "login"
	},

	initialize: function (options) {
		this.template = _.template(tplHome());
        this.render().$el.appendTo("#app"); 
    },
    render:function(){
    	this.$el.html(this.template());
        return this;
    },
	login: function(){
		e.preventDefault();
		console.log("coucouille");
	},
	remove: function(){
		console.log(this.$el)
		this.$el.remove();
		return this;
	}
})