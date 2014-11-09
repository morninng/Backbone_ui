
var HeaderView_Login = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("login");
		self.render();
		return self;
	},

	template: _.template( $('#header_login-template').html()),

	render: function(){
		var self=this;
	//	var template = _.template($("#header_logeduser-template"));
		var output = self.template();
		self.$el.html(output);
		return self;
	}


});