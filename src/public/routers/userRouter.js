angular.module('user')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/views/users/login.html',
        controller: 'UserController',
        controllerAs: 'vm',
      })
      .state('register', {
        url: '/register',
        templateUrl: '/views/users/register.html',
        controller: 'UserController',
        controllerAs: 'vm',
      })
      .state('users', {
        abstract: true,
        url: '/users',
        templateUrl: '/views/users/users.html',
        controller: 'UserController',
        controllerAs: 'vm',
        data: { activeTab: 'users' }
      })
      .state('users.list', {
        url: '',
        templateUrl: '/views/users/users.list.html',
      })

      .state('users.detail', {
        url: '/id/:id',
        templateUrl: '/views/users/users.detail.html',
      });
  });