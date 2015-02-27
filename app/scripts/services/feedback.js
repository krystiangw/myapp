'use strict';

app.factory('Feedback',function ($firebase, FIREBASE_URL, $rootScope, Auth) {

		      var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
		      var collegeObj = $firebase(ref).$asObject();
		      var collegeArray = $firebase(ref).$asArray();
		     
		    var Feedback = {

              all: collegeObj,
              allAsArray: collegeArray,

              writeFeedbackForCollege: function (studentQuery, chatDiscussion, videoURL, nextStep, sessionDate, collegeURL, studentURL) {
                    var currentUser = Auth.resolveUser();
                    var feedbackRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeURL + '/feedback/'+ studentURL + '/');
                    var feedbackObject = $firebase(feedbackRef).$asObject();
                    feedbackObject.studentquery = studentQuery;
                    feedbackObject.chatdiscussion = chatDiscussion;
                    feedbackObject.videourl = videoURL;
                    feedbackObject.nextstep = nextStep;
                    feedbackObject.sessiondate = sessionDate;


                  feedbackObject.$save().then(function(ref) {
                    console.log("College "+collegeURL+ " has successfully given feedback.");                   
                  }, function(error) {
                    console.log("Error:", error);
                  });                   
              },

              getPreviousFeedbackOfStudents : function (studentURL, collegeURL) {
                    var currentUser = Auth.resolveUser();
                    var previousFeedbackRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeURL + '/feedback/'+ studentURL + '/');
                    var previousFeedbackRefObj = $firebase(previousFeedbackRef).$asObject();
                    return previousFeedbackRefObj;
              },

              writeFeedbackForStudent: function (studentQuery, firstAnswer, secondAnswer, thirdAnswer, sessionDate, collegeURL, studentURL) {
                    var currentUser = Auth.resolveUser();
                    var feedbackRef = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentURL + '/feedback/'+ collegeURL + '/');
                    var feedbackObject = $firebase(feedbackRef).$asObject();
                    feedbackObject.studentquery = studentQuery;
                    feedbackObject.firstAnswer = firstAnswer;
                    feedbackObject.secondAnswer = secondAnswer;
                    feedbackObject.thirdAnswer = thirdAnswer;
                    feedbackObject.sessiondate = sessionDate;


                  feedbackObject.$save().then(function(ref) {
                    console.log("Student has successfully given feedback for : "+collegeURL);                   
                  }, function(error) {
                    console.log("Error:", error);
                  });                   
              }                             
        };      
         return Feedback;      
    });      
