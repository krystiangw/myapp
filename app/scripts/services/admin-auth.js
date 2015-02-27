'use strict';

app.factory('AdminAuth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var adminauth = $firebaseSimpleLogin(ref);

  var AdminAuth = {
    createProfileForAdmin: function (usera) {
      var profile = {
        adminname: usera.adminname,
        adminemail: usera.adminemail
      };

      var profileRef = $firebase(ref.child('profileForAdmins'));
      return profileRef.$set(usera.uid, profile).then(function(ref) {          
          var newref = new Firebase(FIREBASE_URL + 'profileForAdmins' + '/' + usera.uid);
          var newprofileObj = $firebase(newref).$asObject();
          newprofileObj.adminname = usera.adminname;
          newprofileObj.adminemail = usera.adminemail;
          newprofileObj.profiletype = "admin";
          newprofileObj.privilege = "access_denied";

          newprofileObj.$save().then(function(ref) {
          }, function(error) {
            console.log("Error:", error);
          });

        }, function(error) {
          console.log("Error:", error);
      });
    },
    createAdminForSpecialUsers: function (usera) {
      var studentAdminSync = $firebase(ref.child('admin/adminUsers'));
      studentAdminSync.$set(usera.uid, usera.adminemail);
    },    
    registerAdmin: function (usera) {
      return adminauth.$createUser(usera.adminemail, usera.adminpassword);
    },
    loginAdmin: function (usera) {
      var options = {email: usera.adminemail, password: usera.adminpassword};
      return adminauth.$login('password', options);
    },
    logout: function () {
      adminauth.$logout();
    },
    resolveUser: function() {
      return adminauth.$getCurrentUser();
    },
    signedIn: function() {
      return !!AdminAuth.usera.provider;
    },
    usera: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, usera) {
    console.log('logged in');
    angular.copy(usera, AdminAuth.usera);
    AdminAuth.usera.profile = $firebase(ref.child('profileForAdmins').child(AdminAuth.usera.uid)).$asObject();
    var currentUser = adminauth.$getCurrentUser();
    AdminAuth.usera.sessions = $firebase(new Firebase(FIREBASE_URL + 'profileForAdmins/' + currentUser.$$state.value.uid + '/sessions' + '/')).$asObject();
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    if(AdminAuth.usera && AdminAuth.usera.profile) {
      AdminAuth.usera.profile.$destroy();
    }
    angular.copy({}, AdminAuth.usera);
  });
  return AdminAuth;
});