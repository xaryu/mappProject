var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

    .config(function($routeProvider){
        $routeProvider.when('/join', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html'
        }).when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html'
        }).otherwise({redirectTo:'/join'})
    });
