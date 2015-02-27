'use strict';
 
app.controller('CollegeProfileCtrl', function ($scope, $location, $modal, $http, $filter, AuthCollege, Auth, AdminAuth, Search, Session) {

  var str = $location.path();
  var collegeIdArraySplit = str.split("/college-profile/");
  $scope.userc = AuthCollege.userc;
  $scope.user = Auth.user;
  $scope.usera = AdminAuth.usera;
  $scope.query = "";
  $scope.submitsuccesstext = false;
  //$scope.user = Auth.user;

  /*$filter('limitTo')($location.path(), -15)*/
  $scope.college = Search.find(collegeIdArraySplit[1]); 
  
  if ($location.path() === '/') {     
  }
 
  $scope.bookSession = function ( collegeId ) {
    
    Session.booksession( collegeId, $scope.mytime.getHours(), $scope.mytime.getMinutes(), $filter('date')($scope.dt,'d MMMM yyyy Z'), $scope.query );
    $scope.submitsuccesstext = true;

    var dataToPostCollege =  {
                        to: $scope.college.counselloremail, 
                        hour: $scope.mytime.getHours(), 
                        minute: $scope.mytime.getMinutes(), 
                        date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                        query: $scope.query, 
                        cname: $scope.college.collegename,
                        sname: $scope.user.profile.studentname
                      };

                $http({
                url: "/sendsessionmailtocollege", 
                method: "GET",
                params: { to: dataToPostCollege.to, 
                          hour: dataToPostCollege.hour, 
                          minute: dataToPostCollege.minute, 
                          query: dataToPostCollege.query, 
                          cname: dataToPostCollege.cname,
                          sname: dataToPostCollege.sname, 
                          date: dataToPostCollege.date
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });

                var dataToPostStudent =  {
                        to: $scope.user.profile.email, 
                        hour: $scope.mytime.getHours(), 
                        minute: $scope.mytime.getMinutes(), 
                        date: $filter('date')($scope.dt,'d MMMM yyyy Z'), 
                        query: $scope.query, 
                        cname: $scope.college.collegename,
                        sname: $scope.user.profile.studentname
                      };

                $http({
                url: "/sendsessionmailtostudent", 
                method: "GET",
                params: { to: dataToPostStudent.to, 
                          hour: dataToPostStudent.hour, 
                          minute: dataToPostStudent.minute, 
                          query: dataToPostStudent.query, 
                          cname: dataToPostStudent.cname,
                          sname: dataToPostStudent.sname, 
                          date: dataToPostStudent.date
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });

/*    iosOverlay({
      text: "Successfully Booked!",
      duration: 5e3,
      icon: "../images/check.png" 
    });*/
  //return false;
  };

  $scope.available = function() {
      if($scope.college.collegeAvailability == "online")
        return true;
  };
 
  $scope.notavailable = function() {
    if($scope.college.collegeAvailability == "offline")
      return true;
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = new Date();
  };
  
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };

  $scope.openModalCourseOffered = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };
});