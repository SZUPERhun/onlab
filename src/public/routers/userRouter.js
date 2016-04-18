angular.module('user')
  .config(function ($stateProvider, $urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('users', {
        url: '/',
        templateUrl: '/views/users.html',
        controller: 'UserController'
      })

      .state('user.detail', {
        url: '/:id',
        templateUrl: '/views/userDetail.html',
        controller: 'UserDetailController'
      });
  });