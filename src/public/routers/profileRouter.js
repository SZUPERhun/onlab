angular.module('profile')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('profile', {
        abstract: true,
        url: '',
        template: '<ui-view/>',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: { activeTab: 'profile' },
      })
      .state('profile.home', {
        url: '',
        templateUrl: 'views/profile/profile.home.html',
      });

  });

