
var ContentListView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content list view");
		self.render();
		return self;
	},

	template: _.template( $('#tab-content-template').html()),

	events: {
		'click #create_context': 'Create_context_view'
	},

	Create_context_view: function(){

      var create_content_view = new ContentCreationView({
        model: new SpeechContext(),
        el: '#main-context'
      });

      create_content_view.on('submit:form', function(attrs){
        this.model.set( "title", attrs.title);
        this.model.set( "description", attrs.description);
        this.model.save(null,{
          success: function(){
            alert("aaa");
          },
          error: function(){
            alert("bbb");
          }
        });
      })
	},
	render: function(){
		var self=this;
		var output = self.template({'content_collection':self.collection.toJSON()});
		self.$el.html(output);
		return self;
	}
});
