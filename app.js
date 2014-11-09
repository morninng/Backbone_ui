
(function(){


  var currentUser = Parse.User.current();
  if (currentUser) {
	 var query = new Parse.Query(MixidiaUser);	
	 query.get(currentUser.id, {
		  success: function(mixidea_user) {
		  	var header_view = new HeaderView_LogedUser({model: mixidea_user, el: '#HeaderView'});
		  	header_view.render();
		  },
		  error: function(object, error) {
		  	var header_view = new HeaderView_Login({el: '#HeaderView'});
		  }
	 });
   } else {
	 var header_view = new HeaderView_Login({el: '#HeaderView'});
   }


  Backbone.history.start();

}());
