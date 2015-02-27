'use strict';

app.controller('CollegeDashCtrl', function ($scope, $filter, Search, Auth, AdminAuth, $modal, AuthCollege, CollegeReg, Feedback) {
   
     $scope.user = Auth.user.profile;
     $scope.userc = AuthCollege.userc;
     $scope.usera = AdminAuth.usera;
     $scope.chatFeedback = [];
     $scope.videourl = [];
     $scope.chatdiscussion = [];
     $scope.nextstep = [];
     $scope.onfeedbacksuccessful = false;
     $scope.studentdetail = function (studenturl) {
          $scope.studentobject = Search.getStudentDetail(studenturl);
     }

     $scope.studentname = function (feedbackId) {
          var studentNameObj = Search.getStudentName(feedbackId);
          return studentNameObj;
     }

     $scope.studentemail = function (feedbackId) {
          var studentEmailObj = Search.getStudentEmail(feedbackId);
          return studentEmailObj;
     }

     $scope.studentstatus= function (feedbackId){
           var studentStatusObj = Search.getStudentStatus(feedbackId);
          return studentStatusObj;
     }

     $scope.studentphoto = function (feedbackId) {
          var studentPhotoObj = Search.getStudentPhoto(feedbackId);
          return studentPhotoObj;
     }

     $scope.sortSessionsByDate = function(session) {
        if( session.sessiondate.indexOf(" +") >= 0 ){
          var dateSplitArray = session.sessiondate.split(" +");
        }
        else if( session.sessiondate.indexOf(" -") >= 0 ){
          var dateSplitArray = session.sessiondate.split(" -");
        }
        var dateobj = new Date(dateSplitArray[0]);
        var newdate = $filter('date')(dateobj,'dd MMMM yyyy')
        var dateobj2 = new Date(newdate);
        var newdate2 = $filter('date')(dateobj2,'yyyy MM dd');  
      return newdate2;
     };         

     $scope.sortFeedbacksByDate = function(feedback) {
        if( feedback.sessiondate.indexOf(" +") >= 0 ){
          var dateSplitArray = feedback.sessiondate.split(" +");
        }
        else if( feedback.sessiondate.indexOf(" -") >= 0 ){
          var dateSplitArray = feedback.sessiondate.split(" -");
        }
        var dateobj = new Date(dateSplitArray[0]);
        var newdate = $filter('date')(dateobj,'dd MMMM yyyy')
        var dateobj2 = new Date(newdate);
        var newdate2 = $filter('date')(dateobj2,'yyyy MM dd');  
      return newdate2;
     };         
    
    $scope.getPreviousFeedbackOfStudents = function (studenturl, collegeurl){
      $scope.onfeedbacksuccessful = false;
      $scope.Feedback = Feedback.getPreviousFeedbackOfStudents(studenturl, collegeurl);
    };

    $scope.createFeedbackForCollege = function (studentQuery, studenturlId, sessionDate, collegeURL, studentURL ) {
            $scope.chatdiscussion[studenturlId] = $scope.Feedback.chatdiscussion;
            $scope.videourl[studenturlId] = $scope.Feedback.videourl;
            $scope.nextstep[studenturlId] = $scope.Feedback.nextstep;

            var chatDiscussion = $scope.chatdiscussion[studenturlId];
            var videoURL = $scope.videourl[studenturlId];
            var nextStep = $scope.nextstep[studenturlId];

          Feedback.writeFeedbackForCollege(studentQuery, chatDiscussion, videoURL, nextStep, sessionDate, collegeURL, studentURL);
          $scope.onfeedbacksuccessful = true;
     };

     $scope.open = function (size) {
         var modalInstance = $modal.open({
           templateUrl: 'myModalContent2.html',
           controller: 'ModalInstanceCtrl2',
           size: size,
         });
     };
});