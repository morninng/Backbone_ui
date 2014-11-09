
var HeaderView_LogedUser = Backbone.View.extend({


	initialize:  function(options){
		self=this;
		console.log("logeduser");
		return self;
	},

	template: _.template( $('#header_logeduser-template').html()),

	render: function(){
		var self=this;
	//	var template = _.template($("#header_logeduser-template"));
		console.log(self.model.toJSON());
		console.log(JSON.stringify(self.model));

		var output = self.template(self.model.toJSON());
		self.$el.html(output);
		return self;
	}


});