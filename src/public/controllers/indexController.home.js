angular.module('index')
  .controller('Home.IndexController', Controller);

function Controller(UserService) {
  const vm = this;

  vm.user = null;

  initController();

  function initController() {
    // get current user
    UserService.GetCurrent().then(function (user) {
      vm.user = user;
    });
  }
}