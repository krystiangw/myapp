'use strict';

app.controller('CollegeRegCtrl', function ($scope, $location, $http, CollegeReg, userb) {
  $scope.submitbuttondisabled = false;
  if (userb) {
    $location.path('/');
  }

  $scope.roles = [
    {id: '0', text: 'Engineering'},
    {id: '1', text: 'Computer Applications / IT'},
    {id: '2', text: 'Biotechnology'},
    {id: '3', text: 'Microbiology'},
    {id: '4', text: 'Agriculture'},
    {id: '5', text: 'Food Technology'},
    {id: '6', text: 'Nutrition and Dietetics'}, 
    {id: '7', text: 'Arts (Humanities)'},
    {id: '8', text: 'Library Science'},
    {id: '9', text: 'Management'},
    {id: '10', text: 'Commerce'},
    {id: '11', text: 'Economics'},
    {id: '12', text: 'Hotel Management and Tourism'},
    {id: '13', text: 'Architecture'},
    {id: '14', text: 'Planning'},
    {id: '15', text: 'Fine Arts'},
    {id: '16', text: 'Performing Arts'},
    {id: '17', text: 'Pharmaceutical Sciences'},
    {id: '18', text: 'Ayurvedic Pharmaceutical Sciences'},
    {id: '19', text: 'Physiotherapy'},
    {id: '20', text: 'Paramedical Sciences'},
    {id: '21', text: 'Education'},    
    {id: '22', text: 'Physical Education'},
    {id: '23', text: 'Law'},
    {id: '24', text: 'Design'},
    {id: '25', text: 'Sciences'}
  ];
    $scope.uSer = {
      roles: []
    };

  $scope.rolesA = [
    {idA: '0', textA: 'Engineering'},
    {idA: '1', textA: 'Computer Applications / IT'},
    {idA: '2', textA: 'Biotechnology'},
    {idA: '3', textA: 'Microbiology'},
    {idA: '4', textA: 'Biochemistry'},
    {idA: '5', textA: 'Agriculture'},
    {idA: '6', textA: 'Food Technology'},
    {idA: '7', textA: 'Nutrition and Dietetics'},
    {idA: '8', textA: 'English and Foreign Languages'},
    {idA: '9', textA: 'Indian Languages'},
    {idA: '10', textA: 'Library Science'},
    {idA: '11', textA: 'Sociology'},
    {idA: '12', textA: 'Geography'},
    {idA: '13', textA: 'Management'},
    {idA: '14', textA: 'Commerce'},
    {idA: '15', textA: 'Economics'},
    {idA: '16', textA: 'Hotel Management and Tourism'},
    {idA: '17', textA: 'Architecture'},
    {idA: '18', textA: 'Planning'},
    {idA: '19', textA: 'Fine Arts'},
    {idA: '20', textA: 'Performing Arts'},
    {idA: '21', textA: 'Pharmaceutical Sciences'},
    {idA: '22', textA: 'Ayurvedic Pharmaceutical Sciences'},
    {idA: '23', textA: 'Physiotherapy'},
    {idA: '24', textA: 'Paramedical Sciences'},
    {idA: '25', textA: 'History'},
    {idA: '26', textA: 'Political Science'},
    {idA: '27', textA: 'Psychology'},
    {idA: '28', textA: 'Education'},    
    {idA: '29', textA: 'Physical Education'},
    {idA: '30', textA: 'Law'},
    {idA: '31', textA: 'Design'},
    {idA: '32', textA: 'Sciences'}
  ];
    $scope.uSerA = {
      rolesA: []
    };


  $scope.registerForCollege = function () {
    $scope.submitbuttondisabled = true;
    $scope.modalShown = true;
    var check = !(($scope.college_reg.confirm_password.$dirty) && ($scope.college_reg.confirm_password.$error.validator));
    if (check) {
        CollegeReg.registerForCollege($scope.userb).then(function(userb) {
            userb.collegename = $scope.userb.collegename;
            userb.collegeaffiliation = $scope.userb.collegeaffiliation;
            userb.collegecountry = $scope.userb.collegecountry;
            userb.collegestate = $scope.userb.collegestate;
            userb.collegecity = $scope.userb.collegecity;
            userb.collegeaddress = $scope.userb.collegeaddress;
            userb.collegelocation = $scope.userb.collegelocation;
            userb.coursesofferedUG = $scope.uSer.roles;
            userb.coursesofferedPG = $scope.uSerA.rolesA;
            userb.collegewebsite = $scope.userb.collegewebsite;
            userb.collegephoto = $scope.userb.collegephoto;
            userb.counselloremail = angular.lowercase($scope.userb.counselloremail);
            userb.collegepassword = $scope.userb.collegepassword;
            userb.profiletype = $scope.userb.profiletype; 
            userb.collegetype = $scope.userb.collegetype;
            userb.collegId = $scope.userb.uid;
            userb.collegeAvailability = $scope.userb.collegeAvailability;
            userb.verifiedcollege = $scope.userb.verifiedcollege;
            userb.collegeRank = $scope.userb.collegeRank;
            

          CollegeReg.createProfileForCollege(userb);
          CollegeReg.createAdminForCollege(userb);
          var dataToPost = {
                                to: userb.counselloremail, 
                                pass: $scope.userb.collegepassword, 
                                cname: $scope.userb.collegename
                            };
                $http({
                url: "/sendcollegemail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            cname: dataToPost.cname,
                            pass : dataToPost.pass
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });
        }, function(error) {
          $scope.error = error.toString();
          $scope.modalShown = false;
          $scope.submitbuttondisabled = false;
        });
    }else {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check passwords";
    }
  };
});