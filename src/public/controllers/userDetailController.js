angular.module('user')
  .controller('UserDetailController', 
    ['$scope', '$routeParams', 'Users', '$location', 
      function ($scope, $routeParams, Users, $location) {
    $scope.user = Users.get({id: $routeParams.id });

    $scope.update = function(){
      Users.update({id: $scope.user._id}, $scope.user, function(){
        $location.url('/');
      });
    };

    $scope.remove = function(){
      Users.remove({id: $scope.user._id}, function(){
        $location.url('/');
      });
    };
  }]);