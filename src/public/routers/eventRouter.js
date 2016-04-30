angular.module('event')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        templateUrl: '/views/events/events.html',
        controller: 'EventController',
        controllerAs: 'vm',
        data: { activeTab: 'events' }
      })
      .state('events.list', {
        url: '',
        templateUrl: '/views/events/events.list.html',
      })
      .state('events.create', {
        url: '/create',
        templateUrl: '/views/events/events.create.html',
      })
      .state('events.detail', {
        url: '/id/:id',
        templateUrl: '/views/events/events.detail.html',
      });
  });