/**
 * Created by hudeda on 21/11/2016.
 */
var app = angular.module('myApp',['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/electricity',{
            templateUrl:'MyElectricity.php'
        })
        .when('/tourist',{
            templateUrl:'MyTourist.php'
        })
        .when('/computer',{
            templateUrl:'MyComputer.php'
        })
        .when('/sport',{
            templateUrl:'MySport.php'
        })
        .when('/cellular',{
            templateUrl:'MyCellular.php'
        })
        .when('/car',{
            templateUrl:'MyCar.php'
        })
        .when('/other',{
            templateUrl:'MyOther.php'
        })
        .otherwise({redirectTo: '/'});

})