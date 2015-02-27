'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth, AdminAuth, CollegeReg) {

  	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	$scope.user = Auth.user;
  //$scope.usera = AdminAuth.usera;
	//$scope.userb = CollegeReg.userb;
	$scope.signedInForCollege = CollegeReg.signedInForCollege;
  	$scope.logoutForCollege = CollegeReg.logoutForCollege;
  	$scope.regpage = function() {
  		if($location.path() == '/college')
  			return true;
  	};
  
    $scope.go = function ( path ) {
  		$location.path( path );
	};

}); 