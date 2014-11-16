
var TimelineView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("timeline view");
		self.render();
		return self;
	},

	template: _.template( $('#timeline-template').html()),

	render: function(){
		var self=this;
		var output = self.template({'content_collection':self.collection.toJSON()});
		self.$el.html(output);
		return self;
	}
});