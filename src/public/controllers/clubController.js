angular.module('club')
  .controller('ClubController', Controller);

function Controller($rootScope, $state, $window, ClubService, EventService, FlashService, UserService) {
  const vm = this;

  vm.club = null;
  vm.clubs = null;
  vm.clubCreatorID = null;
  vm.createClub = createClub;
  vm.saveClub = saveClub;
  vm.deleteClub = deleteClub;

  initController();

  //init not done
  function initController() {
    ClubService.GetAll().then(function (clubs) {
      vm.clubs = clubs;
    });
    UserService.GetCurrent().then(function (user) {
      vm.eventCreatorID = user._id;
    });
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams) {
        if (toState.name === 'events.detail' && toParams.id) {
          EventService.GetById(toParams.id).then(function (eventById) {
            vm.event = eventById;
          });
        }
      });
  }

  function createClub() {
    ClubService.Create(vm.event)
      .then(function () {
        FlashService.Success('Club created');
        $state.go('clubs.list');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function saveClub() {
    ClubService.Update(vm.club)
      .then(function () {
        FlashService.Success('Club updated');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function deleteClub() {
    ClubService.Delete(vm.club._id)
      .then(function () {
        // log club out
        $window.location = '/clubs';
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

}