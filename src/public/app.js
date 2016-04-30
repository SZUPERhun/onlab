angular.module('appFront', ['ui.router', 'angular-jwt', 'index', 'event', 'user', 'profile'])
  .config(config)
  .run(run);

function config($locationProvider, $httpProvider, jwtInterceptorProvider) {
  $locationProvider.html5Mode(true);
  /*jwtInterceptorProvider.tokenGetter = ['UserService', function(UserService) {
    //console.log(UserService.GetToken());
    return UserService.GetToken();
  }];
  $httpProvider.interceptors.push('jwtInterceptor');*/
}

function run($http, $rootScope, $window) {
  // add JWT token as default auth header
  /*let jwtToken = null;
  $http.get('/token', function (token) {
    jwtToken = token;
    console.log(token);
  });*/
  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage.jwtToken;

  // update active tab on state change
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    $rootScope.activeTab = toState.data.activeTab;
  });
}