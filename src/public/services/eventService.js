angular.module('appFront')
  .factory('EventService', Service);

function Service($http, $q) {
  const service = {};
  
  service.GetAll = GetAll;
  service.GetById = GetById;
  /*service.GetByEventname = GetByEventname;*/
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;

  return service;

  function GetAll() {
    return $http.get('/api/events').then(handleSuccess, handleError);
  }

  function GetById(_id) {
    return $http.get('/api/events/id/' + _id).then(handleSuccess, handleError);
  }

  /*function GetByEventname(eventname) {
    return $http.get('/api/events/' + eventname).then(handleSuccess, handleError);
  }*/

  function Create(event) {
    return $http.post('/api/events', event).then(handleSuccess, handleError);
  }

  function Update(event) {
    return $http.put('/api/events/id/' + event._id, event).then(handleSuccess, handleError);
  }

  function Delete(_id) {
    return $http.delete('/api/events/id/' + _id).then(handleSuccess, handleError);
  }

  // private functions

  function handleSuccess(res) {
    return res.data;
  }

  function handleError(res) {
    return $q.reject(res.data);
  }
}