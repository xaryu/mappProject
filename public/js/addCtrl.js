var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    $scope.formData.longitude = -98.350;
    $scope.formData.latitude = 39.500;

    // user coords
    geolocation.getLocation().then(function(data){

        coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        $scope.formData.htmlverified = "Verified!";
        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    });

    // Get coordinates based on mouse click
    $rootScope.$on("clicked", function(){
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Not Verified!";
        });
    });

    // refreshing the HTML5 verified location
    $scope.refreshLoc = function(){
        geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
            $scope.formData.htmlverified = "Verified";
            gservice.refresh(coords.lat, coords.long);
        });
    };

    // Creates a new user based on the form fields
    $scope.createUser = function() {
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        $http.post('/users', userData)
            .success(function (data) {
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});

