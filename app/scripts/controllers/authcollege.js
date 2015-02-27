'use strict';

app.controller('AuthCollegeCtrl', function ($scope, $controller, $location, AuthCollege, userc) {

  if (userc) {
    $location.path('/');
  }

  $scope.login = function () {
    AuthCollege.login($scope.userc).then(function () {
      $location.path('/dashboard-college');
    }, function (error) {
      $scope.error = error.toString();
    });
  };
});