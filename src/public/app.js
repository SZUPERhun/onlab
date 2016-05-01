angular.module('appFront', ['ui.router', 'angular-jwt', 'index', 'event', 'user', 'profile'])
  .config(config)
  .run(run);

function config($locationProvider, $httpProvider, jwtInterceptorProvider) {
  /**
   * pretty links but unrefreshable
   */
  //$locationProvider.html5Mode(true);

  
  /*jwtInterceptorProvider.tokenGetter = ['UserService', function(UserService) {
   //console.log(UserService.GetToken());
   return UserService.GetToken();
   }];
   $httpProvider.interceptors.push('jwtInterceptor');*/
}

function run($http, $rootScope, $window) {
  // add JWT token as default auth header
  if ($window.token) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.token;
  }
  // update active tab on state change
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    if (!(toState.name === 'login' || toState.name === 'register')) {
      $rootScope.activeTab = toState.data.activeTab;
    }
  });
}