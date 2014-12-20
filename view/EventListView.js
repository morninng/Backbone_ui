
var EventListView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content list view");
		self.render();
		return self;
	},

	events: {
		'click #create_event': 'Create_event_view'
	},

	Create_event_view: function(){

	 var currentUser = Parse.User.current();
     if (!currentUser) {
     	alert("you need to login before creating context");
		window.location.href = "./login.html";
     }

     var create_event_view = new CreateEventView({
        model: new MixideaEvent(),
        el: '#main-context'
      });

	},

	template: _.template( $('#tab-event-template').html()),

	render: function(){
		var self=this;
		var output = self.template();
		self.$el.html(output);
		return self;
	}
});