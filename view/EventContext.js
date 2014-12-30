
var Parse_Role_Name = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply" ];
var event_span_name = ["#event_PM","#event_LO","#event_MG","#event_MO","#event_RPM","#event_LOR"];
var Debate_Role_name = [  "Prime Minister", "Leader Opposition", "Member Government", "Member Opposition", "eply Prime Minister", "Leader Opposition Reply"];

function Click_Participate_button( event_object, num_role){
	console.log("participate as " + Debate_Role_name[num_role]);

	var currentUser = Parse.User.current();
	event_object.fetch().then(function(event_obj){
		if(event_obj.get(Parse_Role_Name[num_role])){
			$(event_span_name[num_role]).html("<p><font color='red'>Registration failed</font>" * Debate_Role_name[num_role] * " was already assingned to others. please register other role.<p>" );
			return null;
		}else{
			self.model.set(Parse_Role_Name[num_role],currentUser);
			self.model.save(null,{
				success: function(){
					$(event_span_name[num_role]).append("<p><font color='green'>Registration success</font>you have now joined this event as a" + Debate_Role_name[num_role] + "<p>");
					var hangout_element = $("#hangout_area");
					showHangoutButton(hangout_element, event_object);
				},
				error: function(){
					alert("registration has been failed due to the network problem");
				}
			});
		}
	});
}

function Click_Cancel_button( event_object, num_role){
		console.log("cancel" + Debate_Role_name[num_role] );
		var currentUser = Parse.User.current();

		if(currentUser.id != event_object.get(Parse_Role_Name[num_role]).id){
			alert("you cannot change the status");
		}else{
			event_object.fetch().then(function(event_obj){
				event_obj.unset(Parse_Role_Name[num_role]);
				return event_obj.save();
			}).then(function(){
				$(event_span_name[num_role]).append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
}

var EventContext = Backbone.View.extend({

	template: _.template( $('#one-event-context-template').html()),

	initialize:  function(options){
		self=this;

		var hangout_url = self.model.get("hangout_url");
		console.log(hangout_url);
		self.showEvent();
		self.isHangoutButton = false;

		return self;
	},
	events: {
		'click #join_PM': 'Participate_PM',
		'click #join_LO': 'Participate_LO',
		'click #join_MG': 'Participate_MG',
		'click #join_MO': 'Participate_MO',
		'click #join_RPM': 'Participate_RPM',
		'click #join_LOR': 'Participate_LOR',
		'click #cancel_PM': 'cancel_PM_participate',
		'click #cancel_LO': 'cancel_LO_participate',
		'click #cancel_MG': 'cancel_MG_participate',
		'click #cancel_MO': 'cancel_MO_participate',
		'click #cancel_RPM': 'cancel_RPM_participate',
		'click #cancel_LOR': 'cancel_LOR_participate',
		'click #event_hangout_button': 'EventHangoutClick'
	},
	cancel_PM_participate: function(){
		Click_Cancel_button(  self.model, 0);
	},
	Participate_PM: function(){
		Click_Participate_button( self.model, 0);
	},
	cancel_LO_participate: function(){
		Click_Cancel_button(  self.model, 1);
	},
	Participate_LO: function(){
		Click_Participate_button( self.model, 1);
	},
	cancel_MG_participate: function(){
		Click_Cancel_button(  self.model, 2);
	},	
	Participate_MG: function(){
		Click_Participate_button( self.model, 2);
	},
	cancel_MO_participate: function(){
		Click_Cancel_button(  self.model, 3);
	},	
	Participate_MO: function(){
		Click_Participate_button( self.model, 3);
	},
	cancel_RPM_participate: function(){
		Click_Cancel_button(  self.model, 4);
	},	
	Participate_RPM: function(){
		Click_Participate_button( self.model, 4);
	},
	cancel_LOR_participate: function(){
		Click_Cancel_button(  self.model, 5);
	},	
	Participate_LOR: function(){
		Click_Participate_button( self.model, 5);
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
		var currentUser = Parse.User.current();
		var event_id = self.model.id;

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
		var PMR_object = self.model.get("ReplyPM");
		if(PMR_object){
			participants.push(PMR_object);
			participant_role.push("RPM_key");
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

						var yourself;
						if (currentUser.id == participant_o[0].id){
							yourself = true;
							self.my_participation = true;
						}else{
							yourself = false;
						}

						var participant = {"FirstName":participant_o[0].get("FirstName"),
										   "LastName":participant_o[0].get("LastName"),
										   "Profile_picture":participant_o[0].get("Profile_picture"),
										   "idid":participant_o[0].id,
										   "yourself":yourself};
						console.log("participant");
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

				self.showDefaultHangoutButton();
			}
		}
		var i=0;
		f1();
	},
	showDefaultHangoutButton: function(){
		var self = this;
		if(self.my_participation == true){
			var hangout_element = $("#hangout_area");
			showHangoutButton(hangout_element, self.model);
		}
		return self;
	},
	EventHangoutClick: function(){
		var self = this;
		Util_EventHangoutClick(self.model);

		return self;
	}, 
	render: function(){
		var self=this;
		return self;
	}
});
