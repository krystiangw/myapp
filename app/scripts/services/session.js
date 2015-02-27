'use strict';

app.factory('Session',function ($firebase, FIREBASE_URL, $rootScope, Auth) {

    var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
    var collegeObj = $firebase(ref).$asObject();
    var collegeArray = $firebase(ref).$asArray();
   
    var Session = {

        all: collegeObj,
        allAsArray: collegeArray,

        booksession: function (collegeId, hours, minutes, date, query) {
            var currentUser = Auth.resolveUser();
            var str = collegeId;
            var collegeIdArraySplit = str.split(":");
            var collegeurlId = collegeIdArraySplit[1];

            var sessionCollegeRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/sessions' + '/' + currentUser.$$state.value.uid + '/');
            var sessionCollegeObj = $firebase(sessionCollegeRef).$asObject();
            sessionCollegeObj.collegeurl = collegeId;
            sessionCollegeObj.collegeurlId = collegeurlId;
            sessionCollegeObj.studenturl = currentUser.$$state.value.uid;
            sessionCollegeObj.studenturlId = currentUser.$$state.value.id;                         
            sessionCollegeObj.sessionhour = hours;
            sessionCollegeObj.sessionminute = minutes;
            sessionCollegeObj.sessiondate = date;
            sessionCollegeObj.studentquery = query;
            sessionCollegeObj.$save().then(function(ref) {

            }, function(error) {
                console.log("Error:", error);
            });

            var sessionStudentRef = new Firebase(FIREBASE_URL + 'profileForStudents/' + currentUser.$$state.value.uid + '/sessions' + '/' + collegeId + '/');
            var sessionStudentObj = $firebase(sessionStudentRef).$asObject();
            sessionStudentObj.collegeurl = collegeId;
            sessionStudentObj.collegeurlId = collegeurlId;
            sessionStudentObj.studenturl = currentUser.$$state.value.uid;
            sessionStudentObj.studenturlId = currentUser.$$state.value.id;
            sessionStudentObj.sessionhour = hours;
            sessionStudentObj.sessionminute = minutes;
            sessionStudentObj.sessiondate = date;
            sessionStudentObj.studentquery = query;
            sessionStudentObj.$save().then(function(ref) {

            }, function(error) {
                console.log("Error:", error);
            });

        },

        bookSessionInBulk: function (collegeId, studentId, query, hours, minutes, date) {
            var clgstr = collegeId;
            var collegeIdArraySplit = clgstr.split(":");
            var collegeurlId = collegeIdArraySplit[1];

            var stustr = studentId;
            var studentIdArraySplit = stustr.split(":");
            var studenturlId = studentIdArraySplit[1];

            var sessionCollegeRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/sessions' + '/' + studentId + '/');
            var sessionCollegeObj = $firebase(sessionCollegeRef).$asObject();
            sessionCollegeObj.collegeurl = collegeId;
            sessionCollegeObj.collegeurlId = collegeurlId;
            sessionCollegeObj.studenturl = studentId;
            sessionCollegeObj.studenturlId = studenturlId;                         
            sessionCollegeObj.sessionhour = hours;
            sessionCollegeObj.sessionminute = minutes;
            sessionCollegeObj.sessiondate = date;
            sessionCollegeObj.studentquery = query;
            sessionCollegeObj.$save().then(function(ref) {

            }, function(error) {
                console.log("Error:", error);
            });

            var sessionStudentRef = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId + '/sessions' + '/' + collegeId + '/');
            var sessionStudentObj = $firebase(sessionStudentRef).$asObject();
            sessionStudentObj.collegeurl = collegeId;
            sessionStudentObj.collegeurlId = collegeurlId;
            sessionStudentObj.studenturl = studentId;
            sessionStudentObj.studenturlId = studenturlId;
            sessionStudentObj.sessionhour = hours;
            sessionStudentObj.sessionminute = minutes;
            sessionStudentObj.sessiondate = date;
            sessionStudentObj.studentquery = query;
            sessionStudentObj.$save().then(function(ref) {

            }, function(error) {
                console.log("Error:", error);
            });

        },
        
        getSessionForCollege: function () {
            var currentUser = Auth.resolveUser();
            var sessionRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + currentUser.$$state.value.uid + '/sessions' + '/');
            return $firebase(sessionRef).$asObject();
        },
        getSessionCountForCollege: function () {
            var currentUser = Auth.resolveUser();
            var sessionRef = new Firebase(FIREBASE_URL + 'profileForCollege/' + currentUser.$$state.value.uid + '/sessions' + '/');
            return $firebase(sessionRef).$asArray();
        }          
    };  
  return Session;
});

