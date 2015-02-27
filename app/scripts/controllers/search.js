'use strict';

app.controller('SearchCtrl', function ($scope, Auth, Search) {
    
    $scope.signedIn = Auth.signedIn;
	$scope.user = Auth.user;
	$scope.colleges = Search.all; 
	$scope.collegetype = Search.allAsArray;
	$scope.colltype = "college";
}); 