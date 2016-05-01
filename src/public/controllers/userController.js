angular.module('user')
  .controller('UserController', Controller);

function Controller($rootScope, $state, $window, UserService, FlashService) {
  const vm = this;

  vm.user = null;
  vm.users = null;
  vm.currentUser = null;
  vm.saveUser = saveUser;
  vm.deleteUser = deleteUser;
  vm.registerUser = registerUser;
  vm.loginUser = loginUser;
  
  initController();

  function initController() {
    // get current user
    UserService.GetCurrent($window.token).then(function (user) {
      vm.currentUser = user;
    });
    UserService.GetAll().then(function (users) {
      vm.users = users;
    });
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams) {
        if (toState.name === 'users.detail'&& toParams.id) {
          UserService.GetById(toParams.id).then(function (user) {
            vm.user = user;
          });
        }
    });
  }

  function registerUser() {
    UserService.Create(vm.user)
      .then(function () {
        $state.go('login');
        FlashService.Success('User registered');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function loginUser() {
    UserService.Authenticate()
      .then(function (token) {
        $state.go('index.home');
        $window.token = token;
      })
      .catch(function (error) {
        FlashService.Error(error);
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