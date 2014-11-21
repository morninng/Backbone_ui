
var ContentCreationView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content creation view");
		self.render();
		return self;
	},

	template: _.template( $('#content-creation-template').html()),
	
	render: function(){
		var self=this;
		var output = self.template({'contentmodel': self.model.toJSON()});
		self.$el.html(output);
		return self;
	},

	events: {
	   'submit form': 'onSubmit'
	},

	onSubmit: function(e) {
    	e.preventDefault();
   		var attrs = {};
    	attrs.title = this.$('#speechTitle').val();
    	attrs.description = this.$('#speechDescription').val();
    	this.trigger('submit:form', attrs);
    //	this.model.set( "title", );
    //	this.model.set( "description", this.$('#speechDescription').val() );

  	}

});
