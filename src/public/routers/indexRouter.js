angular.module('index')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");
  
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/index.html',
        controller: 'Home.IndexController',
        controllerAs: 'vm',
        data: { activeTab: 'home' }
      });
  });

