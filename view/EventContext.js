
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
		'click #join_LOR': 'Participate_LOR',
		'click #join_RPM': 'Participate_RPM'
	},

	Participate_PM: function(){
		console.log("participate as PM")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("PrimeMinister")){
				$("span#event_PM").append("<p>Prime Minister was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("PrimeMinister",currentUser);
				return self.model.save();
			}
		}).then(function(){
			$("span#event_PM").append("<p>you have now joined this event as a Prime Minister<p>");
		});
	},
	Participate_LOR: function(){
		console.log("participate as LOR")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("LOReply")){
				$("span#event_LOR").append("<p>Leader Opposition Reply Role was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("LOReply",currentUser);
				return self.model.save();
			}
		}).then(function(){
			$("span#event_LOR").append("<p>you have now joined this event as a Leader Opposition Reply<p>");
		});
	},
	AddHangoutButton: function(){
		console.log("add hangout button")
	},
	Go_To_Profile: function(user_id){
		var currentUser = Parse.User.current();
		window.location.href = "./profile.html#show_profile/" + user_id;
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

		var participants = [];
		var participant_role = [];


		var PM_object = self.model.get("PrimeMinister");
		if(PM_object){
			participants.push(PM_object);
			participant_role.push("PM_key");
		}
		var LO_object = self.model.get("LeaderOpposition");
		if(LO_object){
			participants.push(LO_object);
			participant_role.push("LO_key");
		}
		var MG_object = self.model.get("MemberGovernment");
		if(MG_object){
			participants.push(MG_object);
			participant_role.push("MG_key");
		}
		var MO_object = self.model.get("MemberOpposition");
		if(MO_object){
			participants.push(MO_object);
			participant_role.push("MO_key");
		}
		var PMR_object = self.model.get("PMReply");
		if(PMR_object){
			participants.push(PMR_object);
			participant_role.push("PMR_key");
		}
		var LOR_object = self.model.get("LOReply");
		if(LOR_object){
			participants.push(LOR_object);
			participant_role.push("LOR_key");
		}

		var participants_collection = new ParticipantsCollection();
		var ParticipantsObj = Parse.Object.extend("ParticipantsObj");
		var participant_obj = new ParticipantsObj();

		var f1 = function(){
			if(participants.length>0 && i<participants.length){

				var user_query = new Parse.Query(MixidiaUser);
				user_query.equalTo("objectId", participants[i].id);
				var query_promise = user_query.find({
					success: function(participant_o){

						var testjson = {"aa":"bb","CC":"dd"};
						var first_name = participant_o[0].get("FirstName");
						var participant = {"FirstName":participant_o[0].get("FirstName"),
										   "LastName":participant_o[0].get("LastName"),
										   "Profile_picture":participant_o[0].get("Profile_picture"),
										   "id":participant_o[0].id};

						console.log(JSON.stringify(participant));
						participant_obj.set(participant_role[i],participant);
						console.log("participant_obj");
						console.log(JSON.stringify(participant_obj));
						i++;
					}
				})
				query_promise.done(f1);
			}else if(i == participants.length || participants.length==0){
				console.log("retrieving participant object finish");
				console.log("participant_obj");
				console.log(JSON.stringify(participant_obj));
				console.log("event object");
				console.log(JSON.stringify(self.model));
				var output = self.template({'event_object':self.model.toJSON(), 'participant_obj': participant_obj.toJSON()});
				self.$el.html(output);
			}
		}
		var i=0;
		f1();
	},

	render: function(){
		var self=this;
		return self;
	}
});
