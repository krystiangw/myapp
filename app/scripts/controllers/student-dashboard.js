'use strict';

app.controller('StudentDashCtrl', function ($location, $scope, Search, Auth, CollegeReg, Feedback) {
   
  $scope.user = Auth.user;
  $scope.userb = CollegeReg.userb;

    $scope.go = function ( path ) {
      $location.path( path );
  };

  $scope.createFeedbackForStudent = function ( first, second, third, studentQuery, studenturlId, sessionDate, collegeURL, studentURL ) {
    if(first != null){
      var firstAnswer = first;
    }else{
      var firstAnswer = "No Rating Given";
    }
    if(second != null){
      var secondAnswer = second;
    }else{
      var secondAnswer = "No Rating Given";
    }
    if(third != null){
      var thirdAnswer = third;
    }else{
      var thirdAnswer = "Not responded";
    }
    Feedback.writeFeedbackForStudent(studentQuery, firstAnswer, secondAnswer, thirdAnswer, sessionDate, collegeURL, studentURL);

  };

  $scope.collegephoto = function (collegeId) {
    var collegePhotoObj = Search.getCollegePhoto(collegeId);
    return collegePhotoObj;
  };

  $scope.collegename = function (collegeId) {
    var collegeNameObj = Search.getCollegeName(collegeId);
    return collegeNameObj;
  };
});



