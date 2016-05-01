angular.module('event')
  .controller('EventController', Controller);

function Controller($rootScope, $state, $window, EventService, FlashService, UserService) {
  const vm = this;

  vm.event = null;
  vm.events = null;
  vm.eventCreatorID = null;
  vm.createEvent = createEvent;
  vm.saveEvent = saveEvent;
  vm.deleteEvent = deleteEvent;

  initController();

  function initController() {
    EventService.GetAll().then(function (events) {
      vm.events = events;
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

  function createEvent() {
    EventService.Create(vm.event)
      .then(function () {
        FlashService.Success('Event created');
        $state.go('events.list');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function saveEvent() {
    EventService.Update(vm.event)
      .then(function () {
        FlashService.Success('Event updated');
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

  function deleteEvent() {
    EventService.Delete(vm.event._id)
      .then(function () {
        // log event out
        $window.location = '/events';
      })
      .catch(function (error) {
        FlashService.Error(error);
      });
  }

}