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

    /*switch ($state.current.name) {
      case 'events.list':
        listEvents();
        break;
      case 'events.create':
        fillCreator();
        break;
      default:
        break;
    }*/
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
            console.log($state.current);
          });
        }
      });
  }

  function listEvents() {
    EventService.GetAll().then(function (events) {
      vm.events = events;
    });
  }
  
  function fillCreator() {
    UserService.GetCurrent().then(function (user) {
      vm.eventCreator = user;
    });
  }

  function createEvent() {
    console.log(vm.event);
    EventService.Create(vm.event)
      .then(function () {
        FlashService.Success('Event created');
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