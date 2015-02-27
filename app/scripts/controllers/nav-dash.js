'use strict';

app.controller('Nav-dashCtrl', function ($scope, $location, Auth) {

  	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;

});