angular.module('appFront')
  .factory('UserService', Service);

function Service($http, $q) {
  const service = {};

  service.Authenticate = Authenticate;
  service.GetCurrent = GetCurrent;
  service.GetAll = GetAll;
  service.GetById = GetById;
  /*service.GetByUsername = GetByUsername;*/
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;

  return service;

  function Authenticate() {
    return $http.post('/api/users/authenticate').then(handleSuccess, handleError);
  }

  function GetCurrent(token) {
    return $http.get('/api/users/current/' + token).then(handleSuccess, handleError);
  }

  function GetAll() {
    return $http.get('/api/users').then(handleSuccess, handleError);
  }

  function GetById(_id) {
    return $http.get('/api/users/id/' + _id).then(handleSuccess, handleError);
  }

  /*function GetByUsername(username) {
    return $http.get('/api/users/' + username).then(handleSuccess, handleError);
  }*/

  function Create(user) {
    return $http.post('/api/users', user).then(handleSuccess, handleError);
  }

  function Update(user) {
    return $http.put('/api/users/id/' + user._id, user).then(handleSuccess, handleError);
  }

  function Delete(_id) {
    return $http.delete('/api/users/id/' + _id).then(handleSuccess, handleError);
  }

  // private functions

  function handleSuccess(res) {
    return res.data;
  }

  function handleError(res) {
    return $q.reject(res.data);
  }
}