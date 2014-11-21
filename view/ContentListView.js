
var ContentListView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content list view");
		self.render();
		return self;
	},

	template: _.template( $('#tab-content-template').html()),

	

	render: function(){
		var self=this;
		var output = self.template({'content_collection':self.collection.toJSON()});
		self.$el.html(output);
		return self;
	}
});