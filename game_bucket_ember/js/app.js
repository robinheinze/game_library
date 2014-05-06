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



//CONTROLLERS
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
      model.save;
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

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000',
  corsWithCredentials: true,

  buildURL: function(record, suffix) {
    return this._super(record, suffix) + ".json";
  }
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

App.Game.FIXTURES = [
  {
    id: 1,
    description: 'A historical fiction action-adventure open world stealth video game that follows Desmond as he lives the life of an assassin during the Third Crusade through the eyes of his ancestor Altair.',
    title: "Assassin's Creed",
    image: 'http://fc06.deviantart.net/fs71/f/2011/202/f/8/assassin__s_creed_game_icon_by_wolfangraul-d418pbu.png',
    year: 2007,
    console: 'Xbox',
    company: 'Ubisoft',
    inProgress: false
  },
  {
    id: 2,
    title: "Portal",
    description: 'A first-person puzzle-platform game that follows a test subject wielding an Aperture Science Handheld Portal Device around Aperture Science laboratories shooting portals and teleporting through them to solve puzzles.',
    image: 'http://imgttg.com/user/avatar/892922_85114.png',
    year: 2007,
    console: 'Xbox',
    company: 'Valve',
    inProgress: false
  },
  {
    id: 3,
    title: 'Halo 4',
    description: 'An online first-person shooter video game set in a futuristic science fiction setting where players are responsible for defending humanity from the Covenant (aliens).',
    image: 'http://d1vr6n66ssr06c.cloudfront.net/wp-content/themes/egmnowv3/images/icons/Halo-4.png',
    year: 2012,
    console: 'Xbox',
    company: '343 Industries',
    inProgress: true
  }
]
