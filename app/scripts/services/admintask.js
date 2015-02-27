'use strict';
 
app.factory('AdminTask',
  function ($firebase, FIREBASE_URL, $rootScope, Auth) {

    
    //var sync = $firebase(ref.child(profileForCollege));

    var AdminTask = {

        changeSubscription: function (college) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          var sync = $firebase(ref);
          if(college.collegetype=="free"){
            sync.$update({ collegetype: "paid" });
          }
          if(college.collegetype=="paid"){
            sync.$update({ collegetype: "free" });
          }
        },

        changecounsellermail: function (user,$scope) {     
          $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebase(new Firebase(FIREBASE_URL+"admin/collegeUsers/")).$asArray();
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.email)
                    {
                        flag = true;
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);
                        ref.changeEmail({
                            oldEmail : user.email,
                            newEmail : user.nemail,
                            password : user.password  
                            },function(error) {
                                if (error) {
                                    switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorB = error.toString();
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorB = error.toString();
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorB = error.toString();
                                        $scope.$apply();
                                        }
                                 } else {
                                      var reff = new Firebase(FIREBASE_URL + "profileForCollege/" + simpleuser);
                                      var sync = $firebase(reff);
                                      sync.$update({ counselloremail: user.nemail }).then(function(reff) {
                                        var newref = new Firebase(FIREBASE_URL + 'admin/collegeUsers' + '/');
                                        var sync2 = $firebase(newref);
                                        var cemail = {}; 
                                        cemail[simpleuser] = user.nemail;
                                        sync2.$update(cemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorB = null;
                                        user.email= ""; 
                                        user.nemail= "";
                                        user.password="";
                                      }, 
                                      function(error) {
                                        $scope.errorB = error.toString();
                                        $scope.$apply();
                                        });
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorB = "The old email is not a registered Counseller Email.";
                  }
          }
      );         
    }, 

    logoutcollege : function (id) {
      console.log(id);
      var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + id + '/');
      var authing = $firebaseSimpleLogin(ref);
      authing.$logout();
    },

      changestudentmail:function(user,$scope) { 

      $scope.submitsuccesstext = false;    
          var collegeuserArray = $firebase(new Firebase(FIREBASE_URL+"admin/studentUsers/")).$asArray();
          collegeuserArray.$loaded(function(collegeuserArray) {
              var flag = false;
              for(var i=0; i<collegeuserArray.length; i++) 
               {
                  if((collegeuserArray[i].$value) == user.stuemail)
                    {
                        flag = true;
                        var simpleuser = collegeuserArray.$keyAt(collegeuserArray[i]);
                        var ref = new Firebase(FIREBASE_URL);
                        ref.changeEmail({
                            oldEmail : user.stuemail,
                            newEmail : user.stunewemail,
                            password : user.stupassword  
                            },function(error) {
                                if (error) {
                                    switch (error.code) {
                                      case "INVALID_PASSWORD":
                                        $scope.errorA = error.toString();
                                        $scope.$apply();
                                        break;
                                      case "INVALID_USER":
                                        $scope.errorA = error.toString();
                                        $scope.$apply();
                                        break;
                                      default:
                                        $scope.errorA = error.toString();
                                        $scope.$apply();
                                        }
                                 } else {
                                      var reff = new Firebase(FIREBASE_URL + "profileForStudents/" + simpleuser);
                                      var sync = $firebase(reff);
                                      sync.$update({ email: user.stunewemail}).then(function(reff) {
                                        var newref = new Firebase(FIREBASE_URL + 'admin/studentUsers' + '/');
                                        var sync2 = $firebase(newref);
                                        var studentemail = {}; 
                                        studentemail[simpleuser] = user.stunewemail;
                                        sync2.$update(studentemail);
                                        $scope.submitsuccesstext = true;
                                        $scope.errorA = null;
                                        $scope.$apply();
                                        user.stuemail= ""; 
                                        user.stunewemail= "";
                                        user.stupassword="";
                                      }, 
                                      function(error) {
                                        $scope.errorA = error.toString();
                                        $scope.$apply();
                                      });
                                 }
                        });
                    }
                }
                if(flag == false){
                  $scope.errorA = "The old email is not a registered Student.";
                  }
              }
            );  
        },    

       verifyCollege: function (college) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          var sync = $firebase(ref);
          if(college.verifiedcollege=="notverified"){
            sync.$update({ verifiedcollege: "verified" });
          }
        },
        hideCollege: function (college) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          var sync = $firebase(ref);
          if(college.verifiedcollege=="verified"){
            sync.$update({ verifiedcollege: "notverified" });
          }
        },


        blockStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          var sync = $firebase(ref);
          sync.$update({ studentstatus: "block" });
        },

        unblockStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          var sync = $firebase(ref);
          sync.$update({ studentstatus: "notverified" });
        },


        verifyStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          var sync = $firebase(ref);
          if(student.studentstatus=="notverified"){
            console.log("This student was notverified but now its verified");
            sync.$update({ studentstatus: "verified" });
          }
        },

        unverifyStudent: function (student) {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + student.$id + '/');
          var sync = $firebase(ref);
          if(student.studentstatus=="verified"){
            console.log("This student was verified but now its notverified");
            sync.$update({ studentstatus: "notverified" });
          }
        },

        getstudents : function () {
          var ref = new Firebase(FIREBASE_URL + 'profileForStudents/');
          var studentobj = $firebase(ref).$asArray();
          return studentobj;
                          
        },

        changeRank: function (college, cid) {
          var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + college.$id + '/');
          var sync = $firebase(ref);
          if(cid==null)
            $scope.errorC= "Invalid Rank: Please Enter only numeric values between 1 to 2000";
            else         
            {
              sync.$update({ cId: cid });
              $scope.errorC="";
            } 
        },    

        DeleteSessionFromCollege: function (collegeId, studentId) {
            var delSesFrmClg = new Firebase(FIREBASE_URL + 'profileForCollege/' + collegeId + '/sessions/' + studentId);
            var delSesFrmClgObj = $firebase(delSesFrmClg).$asObject();
            delSesFrmClgObj.$loaded().then(function(data) {
                 if(delSesFrmClgObj != null) {                                                
                      $firebase(delSesFrmClg).$remove().then(function() {
                         console.log("values from college forge is deleted")
                       }, function(error) {
                         console.log("Error:", error);
                       });
                  }
                 //console.log(delSesFrmClgObj);
            });
        },

        DeleteSessionFromStudent: function (collegeId, studentId) {
            var delSesFrmStu = new Firebase(FIREBASE_URL + 'profileForStudents/' + studentId + '/sessions/' + collegeId);
            var delSesFrmStuObj = $firebase(delSesFrmStu).$asObject();
            delSesFrmStuObj.$loaded().then(function(data) {
                 if(delSesFrmStuObj != null) {                                                
                      $firebase(delSesFrmStu).$remove().then(function() {
                         console.log("values from student forge is deleted")
                       }, function(error) {
                         console.log("Error:", error);
                       });
                  }
                 //console.log(delSesFrmStuObj);
            });
        },


    };   
    return AdminTask;
  }
);