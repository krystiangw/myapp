'use strict';

app.factory('CollegeReg', function ($firebaseSimpleLogin, $location, FIREBASE_URL, $rootScope, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var collegereg = $firebaseSimpleLogin(ref);

  var CollegeReg = {
    createProfileForCollege: function (userb) {
      var profile = {
        collegename: userb.collegename,
        collegeaffiliation: userb.collegeaffiliation,
        collegecountry: userb.collegecountry,
        collegestate: userb.collegestate,
        collegecity: userb.collegecity,
        collegeaddress: userb.collegeaddress, 
        collegelocation: userb.collegelocation,
        coursesofferedUG: userb.coursesofferedUG,
        coursesofferedPG: userb.coursesofferedPG,        
        collegewebsite: userb.collegewebsite,
        collegephoto: userb.collegephoto,
        counselloremail: userb.counselloremail,
        collegepassword: userb.collegepassword,
        profiletype: userb.profiletype, 
        collegetype: userb.collegetype,
        collegeAvailability : userb.collegeAvailability,
        verifiedcollege : userb.verifiedcollege,
        cId :  userb.collegeRank,
        collegeId: userb.uid,
        md5_hash: userb.md5_hash
      };

      var collegeprofileRef = $firebase(ref.child('profileForCollege'));
      return collegeprofileRef.$set(userb.uid, profile).then(function(ref) {
          var newRef = new Firebase(FIREBASE_URL);
          var collegeref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/' + userb.uid);
          var newprofileObj = $firebase(collegeref).$asObject();


          var stateListArray = $firebase(newRef.child('stateList')).$asArray();     
          var statesRef = $firebase(newRef.child('stateList/states')).$asObject();
                          

          stateListArray.$loaded( function () {
            statesRef.$loaded().then(function() {
              var temp=0;
              angular.forEach(statesRef, function(value,key) {
                  if(value == userb.collegestate) { temp= temp+1; }
                });
              if(temp == 0) {
                    var currentStateCount = stateListArray.$getRecord('stateCount');
                    var myVariables = {};
                    var stateName = "" + (currentStateCount.$value + 1).toString();
                    myVariables[stateName] = stateName;

                    $firebase(new Firebase(FIREBASE_URL + 'stateList/states/'+stateName+'state')).$set(userb.collegestate);

                    var stateDetailArray = $firebase(newRef.child('stateList').child(myVariables[stateName])).$asObject();     

                    //stateDetailArray.state = userb.collegestate;
            
                    stateDetailArray.$save().then(function(ref) {
            
                      var sync = $firebase(newRef.child('stateList'));
                      sync.$update({ stateCount: currentStateCount.$value + 1 });

                    }, function(error) {
                    console.log("Error:", error);
                  });
                  };
                });
              });
          
          newprofileObj.collegename = userb.collegename;
          newprofileObj.collegeaffiliation = userb.collegeaffiliation;
          newprofileObj.collegecountry = userb.collegecountry;
          newprofileObj.collegestate = userb.collegestate;
          newprofileObj.collegecity = userb.collegecity;
          newprofileObj.collegeaddress = userb.collegeaddress;
          newprofileObj.collegelocation = userb.collegelocation;
          newprofileObj.coursesofferedUG = userb.coursesofferedUG;
          newprofileObj.coursesofferedPG = userb.coursesofferedPG;
          newprofileObj.collegewebsite = userb.collegewebsite;
          newprofileObj.collegephoto = userb.collegephoto;
          newprofileObj.counselloremail = userb.counselloremail;
          newprofileObj.collegepassword = userb.collegepassword;
          newprofileObj.profiletype = userb.profiletype;
          newprofileObj.collegetype = userb.collegetype;
          newprofileObj.collegeAvailability = userb.collegeAvailability;
          newprofileObj.verifiedcollege = userb.verifiedcollege;          
          newprofileObj.collegeId = userb.uid;
          newprofileObj.md5_hash = userb.md5_hash;
          newprofileObj.cId = userb.collegeRank;

          newprofileObj.$save().then(function(ref) {
            console.log("College is successfully saved in firebase forge with id: "+userb.uid);
            $location.path('/success');
          }, function(error) {
            console.log("Error:", error);
          });

        }, function(error) {
          console.log("Error:", error);
      });
    },
    createAdminForCollege: function (userb) {
      var collegeAdminSync = $firebase(ref.child('admin/collegeUsers'));
      collegeAdminSync.$set(userb.uid, userb.counselloremail);
    },
    registerForCollege: function (userb) {
      return collegereg.$createUser(userb.counselloremail, userb.collegepassword);
    },

    userb: {}
  };
  return CollegeReg;
});