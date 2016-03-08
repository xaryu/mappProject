var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'headerCtrl', 'geolocation', 'gservice', 'ngRoute'])

    .config(function($routeProvider){
        $routeProvider.when('/join', {
            controller: 'addCtrl',
            templateUrl: 'js/addUser/add-user.html'
        }).when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'js/queryUser/query-users.html'
        }).otherwise({redirectTo:'/join'})
    });
