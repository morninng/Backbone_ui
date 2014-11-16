
var EventListView = Backbone.View.extend({

	initialize: function(options){
		self=this;
		console.log("content list view");
		self.render();
		return self;
	},

	template: _.template( $('#tab-event-template').html()),

	render: function(){
		var self=this;
		var output = self.template();
		self.$el.html(output);
		return self;
	}
});
