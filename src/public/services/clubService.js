angular.module('appFront')
  .factory('ClubService', Service);

function Service($http, $q) {
  const service = {};

  service.GetAll = GetAll;
  service.GetById = GetById;
  /*service.GetByClubname = GetByClubname;*/
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;

  return service;

  function GetAll() {
    return $http.get('/api/clubs').then(handleSuccess, handleError);
  }

  function GetById(_id) {
    return $http.get('/api/clubs/id/' + _id).then(handleSuccess, handleError);
  }

  /*function GetByClubname(clubname) {
   return $http.get('/api/clubs/' + clubname).then(handleSuccess, handleError);
   }*/

  function Create(club) {
    return $http.post('/api/clubs', club).then(handleSuccess, handleError);
  }

  function Update(club) {
    return $http.put('/api/clubs/id/' + club._id, club).then(handleSuccess, handleError);
  }

  function Delete(_id) {
    return $http.delete('/api/clubs/id/' + _id).then(handleSuccess, handleError);
  }

  // private functions

  function handleSuccess(res) {
    return res.data;
  }

  function handleError(res) {
    return $q.reject(res.data);
  }
}