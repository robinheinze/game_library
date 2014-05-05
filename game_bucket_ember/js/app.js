App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('index', {path: '/'}); //Ember will do this without having to specify, but i've included for clarity
});

//ROUTES

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('game');
  }
});

//MODELS

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Game = DS.Model.extend({
  title: DS.attr('string'),
  year: DS.attr('number'),
  console: DS.attr('string'),
  company: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});


App.Game.FIXTURES = [
  {
    id: 1,
    title: "Assassin's Creed",
    year: 2007,
    console: 'Xbox',
    company: 'Ubisoft',
    isCompleted: true
  },
  {
    id: 2,
    title: "Portal",
    year: 2007,
    console: 'Xbox',
    company: 'Valve',
    isCompleted: true
  },
  {
    id: 3,
    title: 'Halo 4',
    year: 2012,
    console: 'Xbox',
    company: '343 Industries',
    isCompleted: false
  }
]
