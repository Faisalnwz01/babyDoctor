'use strict';

angular.module('babyDoctorApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $http) {

$scope.swagger =function(){

  $http.post('https://api.truevault.com/v1/users', 
    {headers: { Authorization: 'f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518'}})
    .then(function(response) {
         console.log(response)
    })
}



    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });