'use strict';

angular.module('babyDoctorApp')
    .controller('MainCtrl', function($scope, $http, socket, $state) {

// $http.get('/api/users/doctors/get').then(function(data){
//     console.log(data, 'asfffffffffffffffff')
// })





        $scope.resetForm = function() {
            $scope.address = {
                name: "",
                street1: "",
                street2: "",
                city: "",
                state: "",
                zip: "",
                phone: ""
            }

        }

        $scope.address = {
            name: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            phone: ""
        }
        $scope.submit = function() {
            $http.post('/api/users/address', $scope.address).then(function(data) {
                if (data.data === "Address is invalid") {
                    console.log("Address is invalid")
                } else {
                    console.log("Address Is Goood")
                    $state.go('childInfo')
                }
            })
        }
    });