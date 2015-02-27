'use strict';

app.factory('dropdownFactory', function ($firebaseSimpleLogin, $location, FIREBASE_URL, $rootScope, $firebase) {
  return {
    getStateDropdownObject: function(key) {
      return $firebase(new Firebase(FIREBASE_URL +"stateList/states/"+ key)).$asObject();
    },
    getAllStateDropdownObjects: function() {
      return $firebase(new Firebase(FIREBASE_URL+"stateList/states/")).$asObject();
    },
    getCourseDropdownObject: function(key) {
      return $firebase(new Firebase(FIREBASE_URL +"courseList/courses/"+ key)).$asObject();
    },
    getAllCourseDropdownObjects: function() {
      return $firebase(new Firebase(FIREBASE_URL+"courseList/courses/")).$asObject();
    },
    getAllCollegeUsers: function() {
      return $firebase(new Firebase(FIREBASE_URL+"admin/collegeUsers/")).$asObject();
    },
    getCollegeData: function(counsellorEmail) {
      console.log("Recieved email is ");
      console.log(counsellorEmail);
      var collegeuserArray = $firebase(new Firebase(FIREBASE_URL+"admin/collegeUsers/")).$asArray();
      collegeuserArray.$loaded(
        function(x) {
          //var rec = list.$getRecord(counsellorEmail);
          var simpleuser = collegeuserArray.$keyAt(counsellorEmail);
          console.log("The simple user details is: ");
          console.log(collegeuserArray.$getRecord(counsellorEmail));
        }, function(error) {
          console.error("Error:", error);
      });
    }

  };
});