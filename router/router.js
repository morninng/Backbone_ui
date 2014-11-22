
  var Mixidea_Router = Backbone.Router.extend({
    routes: {
      'create': 'add',
      ':id/edit': 'edit',
      'context_list': 'showContextList',
      'event_list': 'showEventList',
      'create-new-event': 'create_new_event',
      'create-new-context': 'create_new_context',
    //  '*default': 'defaultRoute',
      '': 'showContextList'
    },
    defaultRoute: function() {
      this.showContextList();
    },
    showEventList: function() {
      this.navigate('EventList');
      this.RenderHeader();
      var event_view = new EventListView({
        el: '#main-context'
      });


    },
    showContextList: function(){
      this.navigate('context_list');
      this.RenderHeader();
      var context_query = new Parse.Query(SpeechContext);
      var context_collection = new ContextCollection();
      context_query.limit(3);
      context_query.find({
        success: function(results){
          for(var i=0;i <results.length; i++){
            context_collection.add(results[i]);
          }
          var content_view = new ContentListView({
            collection:context_collection,
            el: '#main-context'
          });
        },
        error: function(error){
          alert("finding context failed");
        }
      });
    },

    RenderHeader: function(){

     var currentUser = Parse.User.current();
     if (currentUser) {
       var query = new Parse.Query(MixidiaUser);  
       query.get(currentUser.id, {
       success: function(mixidea_user) {
         var header_view = new HeaderView_LogedUser({model: mixidea_user, el: '#header-container'});
         header_view.render();
       },
       error: function(object, error) {
         var header_view = new HeaderView_Login({el: '#header-container'});
         header_view.render();
       }
      });
     } else {
       var header_view = new HeaderView_Login({el: '#header-container'});
         header_view.render();
     }

    },
    
    create_new_context: function(){

    },
    create_new_event: function(){
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



