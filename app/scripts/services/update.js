'use strict';
 
app.factory('Update',
	function ($firebase, FIREBASE_URL, $rootScope) {

  	  	var ref = new Firebase(FIREBASE_URL + 'profileForCollege' + '/');
		var collegeObj = $firebase(ref).$asObject();
		var collegeArray = $firebase(ref).$asArray();
		var Update = {
      		all: collegeObj,
      		allAsArray: collegeArray,

      	    	updateCollegeName: function (college, name) {
                        console.log(college.collegeId);
                        console.log(name);
                        var nametxt = "Initial name";
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegename: name }).then(function(ref) {
                              nametxt = "Name, ";                              
                              console.log("This is running: "+nametxt);
                         }, function(error) {
                              console.log("Error:", error);
                         });
                         console.log("This is running as well: "+nametxt);
                         return nametxt;
                  },

                  updateCollegeAffiliation: function (college, affiliation) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegeaffiliation: affiliation }).then(function(ref) {
                              return "Affiliation, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeWebsite: function (college, website) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegewebsite: website }).then(function(ref) {
                              return "Website, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeAddress: function (college, address) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegeaddress: address }).then(function(ref) {
                              return "Address, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeCity: function (college, city) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegecity: city }).then(function(ref) {
                              return "City, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeLocation: function (college, location) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegelocation: location }).then(function(ref) {
                              return "Location, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeCountry: function (college, country) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegecountry: country }).then(function(ref) {
                              return "Country, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegeState: function (college, state) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegestate: state }).then(function(ref) {
                              return "State, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  },

                  updateCollegePhoto: function (college, photo) {
                         var ref = new Firebase(FIREBASE_URL + 'profileForCollege/' + college.collegeId + '/');
                         var sync = $firebase(ref);
                         sync.$update({ collegephoto: photo }).then(function(ref) {
                              return "Photo, ";
                         }, function(error) {
                              console.log("Error:", error);
                         });
                  }
		};	 
	  return Update;
	}
);