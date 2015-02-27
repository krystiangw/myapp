/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name mmaApp
 * @description
 * # mmaApp
 *
 * Main module of the application.
 */

var app = angular.module('mmaApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils',
    'checklist-model',
    'ui.bootstrap',
    'firebase',
    'reCAPTCHA'
  ])
  app.constant('FIREBASE_URL', 'https://manishmma.firebaseio.com/');
  app.directive('demoEditor', function(broadcastFactory) {
  return {
    restrict: 'AE',
    link: function(scope, elem, attrs) {
      scope.$watch('isEditable', function(newValue) {
        elem.attr('contenteditable', newValue);
      });
      elem.on('keyup keydown', function() {
        scope.$apply(function() {
          scope[attrs.model] = elem.html().trim();
        });
      });
    }
  };
  });
  app.directive("starRating", function() {
    return {
      restrict : "A",
      template : "<ul class='rating'>" +
                 "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                 "    <i class='fa fa-star anhadcust{{$index}}'></i>" + //&#9733
                 "  </li>" +
                 "</ul>",
      scope : {
        ratingValue : "=",
        max : "=",
        onRatingSelected : "&"
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        scope.$watch("ratingValue", function(oldVal, newVal) {
          if (newVal) { updateStars(); }
        });
      }
    };
  });
//  Added Code
  app.directive('modalDialog', function() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true, 
      link: function(scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        scope.hideModal = function() {
          scope.show = false;
        };
      },
      template: "<div class='ng-modal' ng-show='show'>" +
                "<div class='ng-modal-overlay'></div>" +
                 "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
                  "<div class='ng-modal-dialog-content' ng-transclude></div>" +
                 "</div>" +
                 "</div>"
    };
  });
  
  app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
  
    app.config(function (reCAPTCHAProvider) {
      // required: please use your own key :)
      reCAPTCHAProvider.setPublicKey('6LdzWQETAAAAAHr42DnChnVK8z_FYRQMd0AUZ_eB');

      // optional: gets passed into the Recaptcha.create call
      reCAPTCHAProvider.setOptions({
        theme: 'clean'
      });
    });  

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl as registration',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/register-admin', {
        templateUrl: 'views/register-admin.html',
        controller: 'AdminAuthCtrl',
        resolve: {
          usera: function(AdminAuth) {
            return AdminAuth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
          return Auth.resolveUser();
          }
        }
      })
      .when('/login-admin', {
        templateUrl: 'views/login-admin.html',
        controller: 'AdminAuthCtrl',
        resolve: {
          usera: function(AdminAuth) {
          return AdminAuth.resolveUser();
          }
        }
      })
      .when('/college', {
        templateUrl: 'views/new-college.html',
        controller: 'CollegeRegCtrl',
        resolve: {
          userb: function(AuthCollege) {
            return AuthCollege.resolveUser();
          }
        }
      })
      .when('/login-college', {
        templateUrl: 'views/login-college.html',
        controller: 'AuthCollegeCtrl',
        resolve: {
          userc: function(AuthCollege) {
            return AuthCollege.resolveUser();
          }
        }
      })
      .when('/college-dashboard', {
        templateUrl: 'views/college-dashboarda.html',
        controller: 'CollegeDashCtrlA'
      })
      .when('/hang', {
        templateUrl: 'views/hang.html',
        controller: 'CollegeDashCtrl'
      })
      .when('/success', {
        templateUrl: 'views/college-registeration-success.html',
        controller: 'CollegeAuthCtrl'
      })
      .when('/subscription', {
        templateUrl: 'views/upgrade-college-subscription.html',
        controller: 'AdminTaskCtrl'
      })      
      .when('/verify-college', {
        templateUrl: 'views/verify-new-college.html',
        controller: 'AdminTaskCtrl'
      }) 
      .when('/verify-student', {
        templateUrl: 'views/verify-student.html',
        controller: 'AdminTaskCtrl'
      })
      .when('/unverify-student', {
        templateUrl: 'views/unverify-student.html',
        controller: 'AdminTaskCtrl'
      })
      .when('/block-student', {
        templateUrl: 'views/block-student.html',
        controller: 'AdminTaskCtrl'
      })
      .when('/unblock-student', {
        templateUrl: 'views/unblock-student.html',
        controller: 'AdminTaskCtrl'
      })
      .when('/hide-college', {
        templateUrl: 'views/hide-college.html',
        controller: 'AdminTaskCtrl'
      })     
      .when('/edit-college', {
        templateUrl: 'views/edit-college.html',
        controller: 'AdminTaskCtrl'
      })      
      .when('/edit-student', {
        templateUrl: 'views/edit-student.html',
        controller: 'AdminTaskCtrl'
      })      
      .when('/build-enquiry', {
        templateUrl: 'views/build-enquiry.html',
        controller: 'AdminTaskCtrl'
      })      
      .when('/change-counsellor', {
        templateUrl: 'views/change-counsellor.html',
        controller: 'AdminTaskCtrl'
      })
      .when('/change-student-email', {
        templateUrl: 'views/change-studentemail.html',
        controller: 'AdminTaskCtrl'
      }) 
      .when('/delete-enquiry', {
        templateUrl: 'views/delete-enquiry.html',
        controller: 'AdminTaskCtrl'
      }) 
      .when('/logout-users', {
        templateUrl: 'views/logout-users.html',
        controller: 'AdminTaskCtrl'
      }) 
      .when('/change-collegerank', {
        templateUrl: 'views/change-collegerank.html',
        controller: 'AdminTaskCtrl'
      })     
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/college-profile/:collegeId', {
        templateUrl: 'views/college-profile.html',
        controller: 'CollegeProfileCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/student-dashboard.html',
        controller: 'StudentDashCtrl'
      })
      .when('/dashboard-college', {
        templateUrl: 'views/college-dashboard.html',
        controller: 'CollegeDashCtrl'
      })
      .when('/dashboard-admin', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'AdminDashCtrl'
      })
      .when('/nav-dash', {
        templateUrl: 'views/nav-dash.html',
        controller: 'Nav-dashCtrl'
      })
     .when('/error', {
        templateUrl: 'views/err.html',
        controller: 'Nav-dashCtrl'
      })
      .when('/sales', {
        templateUrl: 'views/sales.html',
        controller: 'CollegeDashCtrl'
      })      
      .otherwise({
        redirectTo: '/main'
      });
  });