angular.module('index')
  .controller('IndexController', Controller);

function Controller(UserService) {
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