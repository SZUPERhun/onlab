angular.module('appFront', ['ui.router', 'index', 'event', 'user', 'profile'])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .run(run);

function run($http, $rootScope, $window) {
  // add JWT token as default auth header
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

  // update active tab on state change
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $rootScope.activeTab = toState.data.activeTab;
  });
}

// manually bootstrap angular after the JWT token is retrieved from the server
$(function () {
  // get JWT token from server
  $.get('/token', function (token) {
    window.jwtToken = token;

    //angular.bootstrap(document, ['appFront']);
  });
});