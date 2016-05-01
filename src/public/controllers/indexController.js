angular.module('index')
  .controller('IndexController', Controller);

function Controller($rootScope, $state, $window, UserService) {
  const vm = this;

  vm.currentUser = null;

  initController();

  function initController() {
    // get current user
    if ($window.token) {
      UserService.GetCurrent($window.token).then(function (user) {
        vm.currentUser = user;
      });
    }
    $rootScope.$on('$stateChangeStart', function() {
      console.log('rekt');
      if (!$window.token) {
        console.log('rekt login');
        $state.go('login');
      }
    });
  }
}