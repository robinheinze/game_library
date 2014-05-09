App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('index', {path: '/'}); //Ember will do this without having to specify, but i've included for clarity
  this.resource('games', function() {
    this.route('complete');
    this.route('incomplete');
    this.route('new');
    this.route('all');
    this.resource('game', { path: '/:game_id'}, function() {
      this.route('edit');
    });
  });
  this.resource('results', {path: 'searches/:search_id/results'});
});

//ROUTES

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('game');
  }
});

App.GamesRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('game');
  }
});

App.GameRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('game', params.game_id)
  }
});

App.GamesCompleteRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('games').filterBy('inProgress', false);
  }
});

App.GamesIncompleteRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('games').filterBy('inProgress');
  }
});

App.GamesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('games');
  }
});

App.GamesAllRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('games');
  }
});

App.GameEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('game');
  }
});

App.ResultsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('result', {search_id: params.search_id});
  }
})



//CONTROLLERS
App.ApplicationController = Ember.Controller.extend({
  actions: {
    createSearch: function() {
      var search = this.store.createRecord('search', {
        keyword: this.get('keyword')
      });
      var controller = this;
      var _self = self;
      search.save().then(function() {
        controller.set('keyword', '')
        controller.transitionToRoute('/searches/'+search.id+'/results')
      });
    }
  }
});

App.IndexController = Ember.ArrayController.extend({
  gamesCount: Ember.computed.alias('length'),
  incomplete: function() {
    return this.filterBy('inProgress').slice(0,3);
  }.property('@each.inProgress')
});

App.GamesController = Ember.ArrayController.extend({
  sortProperties: ['title'],
});

App.GameController = Ember.ObjectController.extend({
  actions: {
    markComplete: function() {
      var model = this.get('model');
      model.set('inProgress', false);
      model.save();
    },
    deleteGame: function() {
      if(confirm('Are you sure?')) {
        this.get('model').destroyRecord();
        this.transitionToRoute('games');
      }
    }

  }
});

App.GamesNewController = Ember.ObjectController.extend({
  actions: {
    createGame: function() {
      var game = this.store.createRecord('game', {
        title: this.get('title'),
        description: this.get('description'),
        image: this.get('image'),
        year: this.get('year'),
        console: this.get('console'),
        company: this.get('company'),
        inProgress: true
      });
      var controller = this;
      game.save().then(function() {
        controller.set('title', '');
        controller.set('description', '');
        controller.set('image', '');
        controller.set('year', '');
        controller.set('console', '');
        controller.set('company', '');
      });
      this.transitionToRoute('games');
    }

  }

});

App.GameEditController = Ember.ObjectController.extend({
  actions: {
    updateGame: function() {
      var model = this.get('model');
      var controller = this;
      model.save()
      .then(function() {
        controller.transitionToRoute('game', model);
      });
    }
  }
});


//COMPONENTS


//MODELS

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000'
});


App.Game = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  image: DS.attr('string'),
  year: DS.attr('number'),
  console: DS.attr('string'),
  company: DS.attr('string'),
  inProgress: DS.attr('boolean')
});

App.Search = DS.Model.extend({
  keyword: DS.attr('string'),
  results: DS.hasMany('result', {embedded: 'always'})
});

App.Result = DS.Model.extend({
  game: DS.belongsTo('game', {asnyc: true}),
  search: DS.belongsTo('search', {async: true})
});


// App.store.adapter.serializer.map("App.Game", {
//   games: { embedded: 'load' }
// });

