angular.module('user')
  .controller('UserController', ['$scope', 'Users', function ($scope, Users) {
    $scope.editing = [];
    $scope.users = Users.query();

    $scope.save = function(){
      if(!$scope.newUser || $scope.newUser.length < 1) return;
      var user = new Users({ name: $scope.newUser, completed: false });

      user.$save(function(){
        $scope.users.push(user);
        $scope.newUser = ''; // clear textbox
      });
    };

    $scope.update = function(index){
      var user = $scope.users[index];
      Users.update({id: user._id}, user);
      $scope.editing[index] = false;
    };

    $scope.edit = function(index){
      $scope.editing[index] = angular.copy($scope.users[index]);
    };

    $scope.cancel = function(index){
      $scope.users[index] = angular.copy($scope.editing[index]);
      $scope.editing[index] = false;
    };

    $scope.remove = function(index){
      var user = $scope.users[index];
      Users.remove({id: user._id}, function(){
        $scope.users.splice(index, 1);
      });
    };
  }]);