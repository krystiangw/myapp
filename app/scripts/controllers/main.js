'use strict';

app.controller('MainCtrl', function ($scope, $log, $location, Auth, AdminAuth, AuthCollege, CollegeReg, dropdownFactory) {
  	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	$scope.user = Auth.user;
	$scope.usera = AdminAuth.usera;
	$scope.userc = AuthCollege.userc;
	$scope.signedInForCollege = CollegeReg.signedInForCollege;
  	$scope.logoutForCollege = CollegeReg.logoutForCollege;

    $scope.go = function ( path ) {
  		$location.path( path );
	};

	$scope.dropdownMessage = 'Retrieving Locations...';
  	$scope.states = dropdownFactory.getAllStateDropdownObjects();
  	$scope.stateSelected = function() {
	    $scope.state = dropdownFactory.getStateDropdownObject($scope.stateToView);
  	}

	$scope.states.$loaded().then(function(data) {
	  	$scope.dropdownMessage = 'Where you want to study ?';
	});

	$scope.dropdownMessageCourses = 'Retrieving Courses...';
  	$scope.courses = dropdownFactory.getAllCourseDropdownObjects();
  	$scope.courseSelected = function() {
	    $scope.course = dropdownFactory.getCourseDropdownObject($scope.courseToView);
  	}

	$scope.courses.$loaded().then(function(data) {
	  	$scope.dropdownMessageCourses = 'What you want to study ?';
	});

  });
