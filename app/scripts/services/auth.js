'use strict';

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    createProfile: function (user) {
      var profile = {
        studentname: user.studentname,
        studentphoto: user.studentphoto,
        studentdocument: user.studentdocument,
        studentmobile: user.studentmobile,
        email: user.email,
        fathername: user.fathername,
        gender: user.gender,
        occupation: user.occupation,
        fathernumber: user.fathernumber,
        /*studentabout: user.studentabout,*/
/*        studentfacebook: user.studentfacebook,                */
        password: user.password,
        profiletype: user.profiletype,
        studentAvailability: user.studentAvailability,        
        md5_hash: user.md5_hash,
        studentstatus: user.studentstatus
      };
      var profileRef = $firebase(ref.child('profileForStudents'));

      return profileRef.$set(user.uid, profile).then(function(ref) {


          
          var newref = new Firebase(FIREBASE_URL + 'profileForStudents' + '/' + user.uid);
          var newprofileObj = $firebase(newref).$asObject();
          newprofileObj.studentname = user.studentname;
          newprofileObj.studentphoto = user.studentphoto;
          newprofileObj.studentdocument = user.studentdocument;
          newprofileObj.studentmobile = user.studentmobile;
          newprofileObj.email = user.email;
          newprofileObj.fathername = user.fathername;
          newprofileObj.gender = user.gender;
          newprofileObj.occupation = user.occupation;
          newprofileObj.fathernumber = user.fathernumber;

          newprofileObj.coursesUG = user.coursesinterestedinUG;
          newprofileObj.coursesPG = user.coursesinterestedinPG;

          if((user.academicrecord12th==true)&&(typeof user.academicrecord12thText !== 'undefined')){
            newprofileObj.academicrecord12thMarks = user.academicrecord12thText;
             if((user.academicrecordUG==true)&&(typeof user.academicrecordUGText !== 'undefined')){
                newprofileObj.academicrecordUGMarks = user.academicrecordUGText;
                if((user.academicrecordPG==true)&&(typeof user.academicrecordPGText !== 'undefined')){
                    newprofileObj.academicrecordPGMarks = user.academicrecordPGText;
                };
            };
          };

          
          if(typeof user.studentabout !== 'undefined'){
            newprofileObj.studentabout = user.studentabout;
          }   
          newprofileObj.password = user.password;        
          newprofileObj.profiletype = user.profiletype;
          newprofileObj.studentAvailability = user.studentAvailability;
          newprofileObj.md5_hash = user.md5_hash;
          newprofileObj.studentstatus = user.studentstatus;
        
          newprofileObj.$save().then(function(ref) {
            console.log("Student Profile is successfully created");
          }, function(error) {
            console.log("Error:", error);
          });

        }, function(error) {
          console.log("Error:", error);
      });
    },
    createAdminForStudent: function (user) {
      var studentAdminSync = $firebase(ref.child('admin/studentUsers'));
      studentAdminSync.$set(user.uid, user.email);
    },    
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function () {
      auth.$logout();
    },
    resolveUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
    Auth.user.profile = $firebase(ref.child('profileForStudents').child(Auth.user.uid)).$asObject();
    var currentUser = auth.$getCurrentUser();
    Auth.user.sessions = $firebase(new Firebase(FIREBASE_URL + 'profileForStudents/' + currentUser.$$state.value.uid + '/sessions' + '/')).$asObject();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    if(Auth.user && Auth.user.profile) {
      Auth.user.profile.$destroy();
    }
    angular.copy({}, Auth.user);
  });
  return Auth;
});