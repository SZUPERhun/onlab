angular.module('user')
  .controller('UserController', Controller);

function Controller($rootScope, $state, $window, UserService, FlashService) {
  const vm = this;

  vm.user = null;
  vm.users = null;
  vm.currentUser = null;
  vm.saveUser = saveUser;
  vm.deleteUser = deleteUser;

  initController();

  function initController() {
    // get current user
    UserService.GetCurrent().then(function (user) {
      vm.currentUser = user;
    });
    UserService.GetAll().then(function (users) {
      vm.users = users;
    });
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options) {
        if (toParams.id) {
          UserService.GetById(toParams.id).then(function (user) {
            vm.user = user;
          });
        }
    });
  }

  function saveUser() {
    UserService.Update(vm.user)
      .then(function () {
        FlashService.Success('User updated');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function deleteUser() {
    UserService.Delete(vm.user._id)
      .then(function () {
        // log user out
        $window.location = '/login';
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }
  
}