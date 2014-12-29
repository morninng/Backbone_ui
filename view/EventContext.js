

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
		console.log("cancel PM role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("PrimeMinister").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("PrimeMinister");
				return event_obj.save();
			}).then(function(){
				$("span#event_PM").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page and login<p>");
			});
		}
	},
	Participate_PM: function(){
		console.log("participate as PM")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("PrimeMinister")){
				$("span#event_PM").append("<p><font color='red'>Registration failed</font>Prime Minister was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("PrimeMinister",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_PM").append("<p><font color='green'>Registration success</font>you have now joined this event as a Prime Minister<p>");
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
		});
	},
	cancel_LO_participate: function(){
		console.log("cancel LO role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("LeaderOpposition").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("LeaderOpposition");
				return event_obj.save();
			}).then(function(){
				$("span#event_LO").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
	},	
	Participate_LO: function(){
		console.log("participate as LO")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("LeaderOpposition")){
				$("span#event_LO").append("<p><font color='red'>Registration failed</font>Leader Opposition was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("LeaderOpposition",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_LO").append("<p><font color='green'>Registration success</font>you have now joined this event as a Leader Opposition<p>");	
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
		});
	},
	cancel_MG_participate: function(){
		console.log("cancel MG role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("MemberGovernment").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("MemberGovernment");
				return event_obj.save();
			}).then(function(){
				$("span#event_MG").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
	},	
	Participate_MG: function(){
		console.log("participate as MG")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("MemberGovernment")){
				$("span#event_MG").append("<p><font color='red'>Registration failed</font>Member Government was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("MemberGovernment",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_MG").append("<p><font color='green'>Registration success</font>you have now joined this event as a Member Government<p>");	
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
		});
	},
	cancel_MO_participate: function(){
		console.log("cancel MO role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("MemberOpposition").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("MemberOpposition");
				return event_obj.save();
			}).then(function(){
				$("span#event_MO").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
	},	
	Participate_MO: function(){
		console.log("participate as MO")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("MemberOpposition")){
				$("span#event_MO").append("<p><font color='red'>Registration failed</font>Member Opposition was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("MemberOpposition",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_MO").append("<p><font color='green'>Registration success</font>you have now joined this event as a Member Opposition<p>");	
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
		});
	},
	cancel_RPM_participate: function(){
		console.log("cancel RPM role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("ReplyPM").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("ReplyPM");
				return event_obj.save();
			}).then(function(){
				$("span#event_RPM").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
	},	
	Participate_RPM: function(){
		console.log("participate as RPM")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("ReplyPM")){
				$("span#event_RPM").append("<p><font color='red'>Registration failed</font>Reply Prime Minister was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("ReplyPM",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_RPM").append("<p><font color='green'>Registration success</font>you have now joined this event as a Reply of Prime Minister<p>");	
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
		});
	},
	cancel_LOR_participate: function(){
		console.log("cancel LOR role");
		var currentUser = Parse.User.current();

		if(currentUser.id != self.model.get("LOReply").id){
			alert("you cannot change the status");
		}else{
			self.model.fetch().then(function(event_obj){
				event_obj.unset("LOReply");
				return event_obj.save();
			}).then(function(){
				$("span#event_LOR").append("<p><font color='green'>Cancelation success</font>If you want to participate, you can reload this page again<p>");
			});
		}
	},	
	Participate_LOR: function(){
		console.log("participate as LOR")
		var currentUser = Parse.User.current();
		self.model.fetch().then(function(event_obj){
			if(event_obj.get("LOReply")){
				$("span#event_LOR").append("<p><font color='red'>Registration failed</font>Leader Opposition Reply was already assingned to others. please register other role.<p>" );
				return null;
			}else{
				self.model.set("LOReply",currentUser);
				self.model.save(null,{
					success: function(){
						$("span#event_LOR").append("<p><font color='green'>Registration success</font>you have now joined this event as a Leader Opposition Reply<p>");	
						var hangout_element = $("#hangout_area");
						showHangoutButton(hangout_element, self.model);
					},
					error: function(){
						alert("registration has been failed due to the network problem");
					}
				});
			}
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
