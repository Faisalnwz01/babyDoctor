'use strict';

angular.module('babyDoctorApp')
    .controller('DoctorDashCtrl', function($scope, $http, Auth, $cookieStore, $mdBottomSheet) {

        $scope.show = false;

        $scope.showPastOrders = function(){
            if(!$scope.show){
                $scope.show = true;
            }
            else{
                $scope.show = false;
            }
        }

        $scope.DoctorFormForChild = {
            conditions: "",
            testsPerformed: "",
            perscriptions: ""
        }
        $scope.getCurrentUser = Auth.getCurrentUser()

        $scope.truevaultGetDocs = function(docId) {
            $cookieStore.remove('token')
            $cookieStore.remove('token')
            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'Get',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents/" + docId,
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                }
                // params: {
                //     document: btoa(JSON.stringify($scope.address))
                // }
            }
            $http(doc).success(function(data) {
                // console.log($scope.currentOrder)


                $scope.currentOrder = JSON.parse(atob(data))
                    // return JSON.parse(atob(data));
                console.log($scope.currentOrder);


            }).error(function(data) {
                console.log(data)
            });
        }


// <<<<<<< HEAD
//         // $http.get('api/orders').then(function(data) {
//         //     console.log(data)
//         //     for (var i = 0; i < data.data.length; i++) {
//         //         if (data.data[i].doctor_id === $scope.getCurrentUser.address.phone) {
//         //             console.log('data.data', data.data[i])
//         //             $scope.trueVaultDocId = data.data[i].document_id
//         //             console.log($scope.trueVaultDocId, 'document ID')
//         //             $scope.truevaultGetDocs($scope.trueVaultDocId)
//         //             console.log($scope.trueVaultDocId)
//         //         }
//         //     }
//         // })

//         $http.post('api/orders/getThisOrder', {number: $scope.getCurrentUser.address.phone}).then(function (data) {
//           if (data) {
             $scope.pastOrders = []
//            $scope.trueVaultDocId = data.data[0].document_id
//            $scope.truevaultGetDocs($scope.trueVaultDocId)
//           console.log(data)
//         }
// =======
        $http.get('api/orders').then(function(data) {

            console.log(data)
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].doctor_id === $scope.getCurrentUser.address.phone && data.data[i].status !=="Closed" ) {
                    console.log('data.data', data.data[i])
                    $scope.ParentInfo = data.data[i]
                    $scope.trueVaultDocId = data.data[i].document_id
                    console.log($scope.trueVaultDocId, 'document ID')
                    $scope.truevaultGetDocs($scope.trueVaultDocId)
                    console.log($scope.trueVaultDocId)
                }
                else if(data.data[i].doctor_id === $scope.getCurrentUser.address.phone && data.data[i].status ==="Closed")
                {
                    $scope.pastOrders.push(data.data[i])
                }
            }
        })


        $scope.truevaultSubmitDoctorForm = function() {
            $cookieStore.remove('token')
            $cookieStore.remove('token')
            console.log($scope.DoctorFormForChild)
            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'PUT',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents/" + $scope.trueVaultDocId,
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.DoctorFormForChild))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
                $scope.document_id = data.document_id;
                console.log($scope.token)
                $cookieStore.put('token', $scope.token);
                // $scope.postDocumentID();

            }).error(function(data) {
                console.log(data)
            });


            ///change the order status here to closed
            $http.get('api/orders').then(function(data) {
                console.log(data)
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].document_id === $scope.trueVaultDocId) {
                        console.log(data.data[i])

                        var update = {
                            status: "Closed",
                            dateClosed: new Date()

                        }
                        $http.put('api/orders/' + data.data[i]._id, update).then(function(data) {
                            console.log(data)
                        })
                    }
                }
            })


        };

    })