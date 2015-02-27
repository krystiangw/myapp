'use strict';
 
app.factory('Search',
	function ($firebase, FIREBASE_URL, $rootScope, $q) {

  	  	var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
  	  	var refstudent = new Firebase(FIREBASE_URL + 'profileForStudents/' + '/');
		var collegeObj = $firebase(ref).$asObject();
		var collegeArray = $firebase(ref).$asArray();
		var College = {
			all: collegeObj,
		    allAsArray: collegeArray,

		    find: function (collegeId) {
	      		return $firebase(ref.child(collegeId)).$asObject();
	    	},

	    	getStudentDetail: function (studenturl) {

	    		return $firebase(refstudent.child(studenturl)).$asObject();
	    	},
	    	getStudentName: function (feedbackId) {
                   var studentnameref = new Firebase(FIREBASE_URL + 'profileForStudents/' + feedbackId + '/studentname');
                   return $firebase(studentnameref).$asObject();
            },

            getStudentStatus: function(feedbackId){
                   var studentnameref = new Firebase(FIREBASE_URL + 'profileForStudents/' + feedbackId + '/studentstatus');
                   return $firebase(studentnameref).$asObject();
            },

            getStudentEmail: function (feedbackId) {
                   var studentemailref = new Firebase(FIREBASE_URL + 'profileForStudents/' + feedbackId + '/email');
                   return $firebase(studentemailref).$asObject();
            },

            getStudentPhoto: function (feedbackId) {
                   var studentphotoref = new Firebase(FIREBASE_URL + 'profileForStudents/' + feedbackId + '/studentphoto');
                   return $firebase(studentphotoref).$asObject();
            },

            getCollegePhoto: function (collegeId) {
                   var collegephotoref = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/collegephoto');
                   return $firebase(collegephotoref).$asObject();
            },

            getCollegeName: function (collegeId) {
                   var collegenameref = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/collegename');
                   return $firebase(collegenameref).$asObject();
            },

            getCollegeIdByEmail: function(counsellorEmail) {
              var deferred = $q.defer();
              var collegeUserArray = ($firebase(new Firebase(FIREBASE_URL+"admin/collegeUsers")).$asArray());
              collegeUserArray.$loaded(function(collegeUserArray) {
                  for(var i=0; i<collegeUserArray.length; i++) 
                  {
                    if((collegeUserArray[i].$value) == counsellorEmail)
                    {
                         var simpleUser = collegeUserArray.$keyAt(collegeUserArray[i]);
                    }
                  }
                  if(simpleUser){
                          console.log(simpleUser);
                         deferred.resolve(simpleUser);
                  }
                  else {
                       var simpleUser = "user doesnot exists";
                       deferred.resolve(simpleUser);
                  }
              }, function(error) {
                  console.error("Error:", error);
                  deferred.reject(error);
              });
              return deferred.promise;
              },

              getStudentIdByEmail: function(studentEmail) {
                    var deferred = $q.defer();
                    var studentUserArray = ($firebase(new Firebase(FIREBASE_URL+"admin/studentUsers")).$asArray());
                    studentUserArray.$loaded(function(studentUserArray) {
                        for(var i=0; i<studentUserArray.length; i++) 
                        {
                          if((studentUserArray[i].$value) == studentEmail)
                          {
                               var simpleUser = studentUserArray.$keyAt(studentUserArray[i]);                       
                          }
                        }
                        if(simpleUser){
                                console.log(simpleUser);
                               deferred.resolve(simpleUser);
                        }
                        else {
                             var simpleUser = "user doesnot exists";
                             deferred.resolve(simpleUser);
                        }
                        
                    }, function(error) {
                        console.error("Error:", error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
              },

		};	 
	  return College;
	}
);

