
var EventContext = Backbone.View.extend({

	template: _.template( $('#one-event-context-template').html()),

	initialize:  function(options){
		self=this;
		var event_id = self.model.id;
		console.log("Event Context view");
		console.log(event_id);

		var hangout_url = self.model.get("hangout_url");
		console.log(hangout_url);
		self.showEvent();

		self.render();
		return self;
	},

	showEvent: function(){
		self=this;
		var hangout_domain = self.model.get("hangout_url");
		console.log(hangout_domain);
		var currentUser = Parse.User.current();
		var event_id = self.model.id;
		console.log(event_id);

		var hangout_gid = "?gid="
		var hangout_app_id = config_hangout_app_id;
		var hangout_query_key = "&gd=";
		var hangout_query_value = currentUser.id;
		var hangout_query_split = "_";
		var hangout_second_query_value = event_id;
		var hangout_link= hangout_domain + hangout_gid + hangout_app_id + hangout_query_key
						 + hangout_query_value + hangout_query_split + hangout_second_query_value;
		console.log(hangout_link);
		self.model.set("hangout_link", hangout_link);
		var output = self.template({'event_object':self.model.toJSON()});
		self.$el.html(output);
	},

	render: function(){
		var self=this;
		return self;
	}
});
