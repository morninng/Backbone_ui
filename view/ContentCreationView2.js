
var ContentCreationView2 = Backbone.View.extend({

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
        this.model.set( "title", this.$('#speechTitle').val());
        this.model.set( "description", this.$('#speechDescription').val());
        this.model.save(null,{
          success: function(){
            alert("aaa");
          },
          error: function(){
            alert("bbb");
          }
        });
        e.stopPropagation();
        return false;
      }
    //	e.preventDefault();
});

