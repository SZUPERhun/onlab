angular.module('event')
  .controller('EventController', Controller);

function Controller($rootScope, $window, EventService, FlashService) {
  const vm = this;

  vm.event = null;
  vm.events = null;
  vm.saveEvent = saveEvent;
  vm.deleteEvent = deleteEvent;

  initController();

  function initController() {
    EventService.GetAll().then(function (events) {
      vm.events = events;
    });
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options) {
        if (toParams.id) {
          EventService.GetById(toParams.id).then(function (eventById) {
            vm.event = eventById;
          });
        }
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