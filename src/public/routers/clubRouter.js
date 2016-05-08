angular.module('club')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('clubs', {
        abstract: true,
        url: '/clubs',
        templateUrl: '/views/clubs/clubs.html',
        controller: 'ClubController',
        controllerAs: 'vm',
        data: { activeTab: 'clubs' }
      })
      .state('clubs.list', {
        url: '',
        templateUrl: '/views/clubs/clubs.list.html',
      })
      .state('clubs.create', {
        url: '/create',
        templateUrl: '/views/clubs/clubs.create.html',
      })
      .state('clubs.detail', {
        url: '/id/:id',
        templateUrl: '/views/clubs/clubs.detail.html',
      });
  });