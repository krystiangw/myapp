'use strict';

app.controller('AuthCtrl', function ($scope, $controller, $http, $location, Auth, user, reCAPTCHA) {
  $scope.submitbuttondisabled = false;
  if (user) {
    $location.path('/');
  }
  $scope.message = "";

  $scope.user = {
    gender: 'Male'
  };

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

  $scope.login = function () {
    Auth.login($scope.user).then(function () {
      var usertype = Auth.resolveUser().$$state.value.uid;
      $location.path('/dashboard');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {
    $scope.submitbuttondisabled = true;
    $scope.modalShown = true;
    var check = !(($scope.student_reg.confirm_password.$dirty) && ($scope.student_reg.confirm_password.$error.validator));
    if (check) {
      Auth.register($scope.user).then(function(user) {
        return Auth.login($scope.user).then(function() {
          user.studentname = $scope.user.studentname;
          user.studentphoto = $scope.user.studentphoto;
          user.studentdocument = $scope.user.studentdocument;
          user.studentmobile = $scope.user.studentmobile;
          user.email = angular.lowercase($scope.user.email); 
          user.fathername = $scope.user.fathername;
          user.gender = $scope.user.gender;
          user.occupation = $scope.user.occupation;
          user.fathernumber = $scope.user.fathernumber;
          user.coursesinterestedinUG = $scope.uSer.roles;
          user.coursesinterestedinPG = $scope.uSerA.rolesA;

          user.academicrecord12th = $scope.user.master12th;
          user.academicrecord12thText = $scope.user.master12thText;
          user.academicrecordUG = $scope.user.masterUG;
          user.academicrecordUGText = $scope.user.masterUGText;
          user.academicrecordPG = $scope.user.masterPG;
          user.academicrecordPGText = $scope.user.masterPGText;
          user.studentfacebook = $scope.user.studentfacebook;
          
          if(typeof $scope.user.studentabout !== 'undefined'){
            user.studentabout = $scope.user.studentabout;
          }
               
          user.password = $scope.user.password;
          user.profiletype = $scope.user.profiletype;
          user.studentAvailability = $scope.user.studentAvailability;
          user.studentstatus = $scope.user.studentstatus;
          return Auth.createProfile(user);
        }).then(function() {
          $scope.modalShown = false;
          Auth.createAdminForStudent(user);
          var dataToPost = {
                                to: user.email, 
                                pass: $scope.user.password, 
                                sname: $scope.user.studentname
                            };
                $http({
                url: "/sendstudentmail", 
                method: "GET",
                params: {   to: dataToPost.to,
                            sname: dataToPost.sname,
                            pass : dataToPost.pass
                        }
                }).success(function(serverResponse) {
                    console.log(serverResponse);
                }).error(function(serverResponse) {
                    console.log(serverResponse);
                });
          $location.path('/dashboard');
        });
      }, function(error) {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.error = error.toString();
      });
    } else {
        $scope.modalShown = false;
        $scope.submitbuttondisabled = false;
        $scope.message = "Please re-check passwords";
    }
  };
});