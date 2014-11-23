
var HeaderView_LogedUser = Backbone.View.extend({


	initialize:  function(options){
		self=this;
		console.log("logeduser");
		return self;
	},

	template: _.template( $('#header_logeduser-template').html()),

	events: {
		'click #Logout': 'Parse_Logout'
	},
	Parse_Logout: function(){
		Parse.User.logOut();
		router.RenderHeader();
	},

	render: function(){
		var self=this;
		console.log(self.model.toJSON());
		console.log(JSON.stringify(self.model));
		var output = self.template(self.model.toJSON());
		self.$el.html(output);
		return self;
	}


});