 var hangout_link_pre = "<a style='text-decoration:none;' onclick=login_hangout('";
 var hangout_link_post = "') target='_blank'><img src='https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-60x230-normal.png' alt='Start a Hangout' style='border:0;width:230px;height:60px;'/>";

function tamesi(){
	console.log("tamesi test");

}



var CreateEventView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("event creation view");
		self.render();
		return self;
	},

	template: _.template( $('#event-creation-template').html()),
	
	render: function(){
		var self=this;
		var output = self.template({'eventmodel': self.model.toJSON()});
		self.$el.html(output);
		router.navigate("EventContext", {trigger:false});
		return self;
	},

	events: {
	   'submit form': 'onSubmit'
	},

	onSubmit: function(e) {
    	e.preventDefault();
    	var user_query = new Parse.Query(MixidiaUser);
    	var user_id = Parse.User.current().id;
    	user_query.equalTo("objectId", user_id);
    	user_query.find().then(function(user_obj){
			self.model.set( "title", self.$('#eventTitle').val());
        	self.model.set( "description", self.$('#eventDescription').val());
        	self.model.set("event owner", user_obj[0]);
        	self.model.set("date", self.$('#event_date').val());
        	self.model.set("start time", self.$('#event_start_time').val());
        	self.model.set("duration", self.$('#event_duration').val());
        	return self.model.save();
    	}).then(function(){
    		console.log("success to save" + self.model.id);
    		self.addHangOut_Event(self.model.id);
    	});
  	},

  	addHangOut_Event: function(event_id){
    	// var additional_element = document.getElementById("main-additional");
    	console.log("add hangout");
    	tamesi();
    	self.$el.append("<a onclick=tamesi()>aaaa</a>");
    	self.$el.append(hangout_link_pre + event_id + hangout_link_post);
    //	login_hangout(self.model.id);
  	}

});
