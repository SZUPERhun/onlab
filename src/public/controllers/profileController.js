angular.module('profile')
  .controller('ProfileController', Controller);

function Controller($state, UserService) {
  const vm = this;

  vm.currentUser = null;

  initController();

  function initController() {
    // get current user
    UserService.GetCurrent().then(function (user) {
      vm.currentUser = user;
    });
  }
}