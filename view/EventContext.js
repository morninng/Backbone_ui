
var EventContext = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		var event_id = self.model.id;
		console.log("Event Context view");
		console.log(event_id);
		self.render();
		return self;
	},
	render: function(){
		var self=this;
		return self;
	}
});