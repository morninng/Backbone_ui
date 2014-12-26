
var EventContext = Backbone.View.extend({

	template: _.template( $('#one-event-context-template').html()),

	initialize:  function(options){
		self=this;

		var hangout_url = self.model.get("hangout_url");
		console.log(hangout_url);
		self.showEvent();
		self.isHangoutButton = false;


		self.render();
		return self;
	},

	events: {
		'click #join_PM': 'Participate_PM',
		'click #join_LO': 'Participate_LO',
		'click #join_MG': 'Participate_MG',
		'click #join_MO': 'Participate_MO',
		'click #join_RLO': 'Participate_RLO',
		'click #join_RPM': 'Participate_RPM',
	},

	Participate_PM: function(){

		var currentUser = Parse.User.current();
		self.model.set("PrimeMinister",currentUser);
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("PrimeMinister")){
				$("span#event_PM").append("<p>Prime Minister was already assingned to others. please register other role.<p>" );

				return null;
			}else{
				self.model.set("PrimeMinister",currentUser);
				return self.model.save()
			}
		}).then(function(){
			$("span#event_PM").append("<p>you have now joined this event as a Prime Minister<p>");
		});

		if(!self.isHangoutButton){
			self.AddHangoutButton();
		}

	},
	AddHangoutButton: function(){
		console.log("add hangout button")
	},
	showEvent: function(){
		self=this;
		var hangout_domain = self.model.get("hangout_url");
		var currentUser = Parse.User.current();
		console.log(hangout_domain);
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
