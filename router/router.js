(function () {


  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "home",
      "create": "add",
      ":id/edit": "edit"
    },
    initialize: function (){


      var currentUser = Parse.User.current();
        if (currentUser) {
            console.log("already login");
        } else {
            console.log("not login");
        }


    }, 
    login: function(){
    },
    signup: function(){
    },
    timeline: function(){
    },
    show_context: function(){
    },
    edit_context: function(){
    },
    show_user: function(){
    },
    edit_user: function(){
    }
  });

  var router = new AppRouter();

  console.log("");

  Backbone.history.start();

}());

