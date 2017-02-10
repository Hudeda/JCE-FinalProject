/**
 * Created by hudeda on 21/11/2016.
 */
var app = angular.module('myApp1', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/electricity',{
            templateUrl:'pages/MyElectricity.php'
        })
        .when('/tourist',{
            templateUrl:'pages/MyTourist.php'
        })
        .when('/computer',{
            templateUrl:'pages/MyComputer.php'
        })
        .when('/sport',{
            templateUrl:'pages/MySport.php'
        })
        .when('/cellular',{
            templateUrl:'pages/MyCellular.php'
        })
        .when('/car',{
            templateUrl:'pages/MyCar.php'
        })
        .when('/other',{
            templateUrl:'pages/MyOther.php'
        })
        .when('/userProduct',{
            templateUrl:'pages/MyProducts.php',
        })
        .when('/',{
            templateUrl:'pages/MyHomePage.php',
        })
        .otherwise({redirectTo: '/'});
})
