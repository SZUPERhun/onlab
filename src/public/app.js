angular.module('appFront', ['ui.router', 'index', 'event', 'user', 'profile'])
  .config(config)
  .run(run);

function config($locationProvider) {
  $locationProvider.html5Mode(true);
}

function run($http, $rootScope, $window) {
  // add JWT token as default auth header
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.jwtToken;

  // update active tab on state change
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $rootScope.activeTab = toState.data.activeTab;
  });
}