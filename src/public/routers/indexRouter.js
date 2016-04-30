angular.module('index')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");
  
    $stateProvider
      .state('index', {
        abstract: true,
        url: '/',
        template: '<ui-view/>',
        controller: 'IndexController',
        controllerAs: 'vm',
        data: { activeTab: 'home' },
      })
      .state('index.home', {
        url: '',
        templateUrl: 'views/index/index.home.html',
      });
    
  });

