'use strict';

app.factory('AuthCollege', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase, Session) {
  var ref = new Firebase(FIREBASE_URL);
  var authcollege = $firebaseSimpleLogin(ref);

  var AuthCollege = {

    login: function (userc) {
      return authcollege.$login('password', userc);
    },
    logout: function () {
      authcollege.$logout();
    },
    resolveUser: function() {
      return authcollege.$getCurrentUser(); 
    },
    signedIn: function() {
      return !!AuthCollege.userc.provider;
    },
    userc: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, userc) {
    console.log('logged in');
    angular.copy(userc, AuthCollege.userc);
    AuthCollege.userc.profile = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid)).$asObject();
    AuthCollege.userc.collegeid_CollegeAvailability = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid));
    AuthCollege.userc.studentid_StudentAvailability = $firebase(ref.child('profileForStudents').child(AuthCollege.userc.uid));    

    var collegeObj = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid)).$asObject();
    var collegesync = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid))
    collegeObj.$loaded()
      .then(function(data) {
        if((typeof collegeObj.profiletype !== 'undefined')&&(collegeObj.profiletype=="college")){
            collegesync.$update({collegeAvailability : "online"});
          }           
        })
        .catch(function(error) {
          console.error("Error:", error);
        });

    

    var studentObj = $firebase(ref.child('profileForStudents').child(AuthCollege.userc.uid)).$asObject();
    var studentsync = $firebase(ref.child('profileForStudents').child(AuthCollege.userc.uid))
    studentObj.$loaded()
      .then(function(data) {
        if((typeof studentObj.profiletype !== 'undefined')&&(studentObj.profiletype=="student")){
            studentsync.$update({studentAvailability : "online"});   
          }           
        })
        .catch(function(error) {
          console.error("Error:", error);
        });
        
    AuthCollege.userc.sessions = Session.getSessionForCollege();
    AuthCollege.userc.sessionCount = Session.getSessionCountForCollege();
    AuthCollege.userc.feedback = $firebase(new Firebase(FIREBASE_URL + 'profileForCollege/' + AuthCollege.userc.uid + '/feedback' + '/')).$asObject();
    AuthCollege.userc.feedbackCount = $firebase(new Firebase(FIREBASE_URL + 'profileForCollege/' + AuthCollege.userc.uid + '/feedback' + '/')).$asArray();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    if(AuthCollege.userc && AuthCollege.userc.profile) {
      var collegeObj = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid)).$asObject();
      var collegesync = $firebase(ref.child('profileForCollege').child(AuthCollege.userc.uid));
      collegeObj.$loaded()
        .then(function(data) {
             if((typeof collegeObj.profiletype !== 'undefined')&&(collegeObj.profiletype=="college")){
                collegesync.$update({collegeAvailability : "offline"});              
            }           
        })
        .catch(function(error) {
          console.error("Error:", error);
        });
      var studentObj = $firebase(ref.child('profileForStudents').child(AuthCollege.userc.uid)).$asObject();
      var studentsync = $firebase(ref.child('profileForStudents').child(AuthCollege.userc.uid));
      studentObj.$loaded()
        .then(function(data) {
             if((typeof studentObj.profiletype !== 'undefined')&&(studentObj.profiletype=="student")){
              studentsync.$update({studentAvailability : "offline"});              
            }           
        })
        .catch(function(error) {
          console.error("Error:", error);
        });

      AuthCollege.userc.profile.$destroy();
    }
    angular.copy({}, AuthCollege.userc);
  });
  return AuthCollege;
});