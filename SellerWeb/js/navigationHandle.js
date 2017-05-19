/**
 * Created by hudeda on 16/01/2017.
 */
/**
 * Created by hudeda on 21/11/2016.
 */
var app = angular.module('myApp',['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/pages/electricity',{
            templateUrl:'pages/electricity.php'
        })
        .when('/tourist',{
            templateUrl:'pages/tourist.php'
        })
        .when('/computer',{
            templateUrl:'pages/computer.php'
        })
        .when('/sport',{
            templateUrl:'pages/sport.php'
        })
        .when('/cellular',{
            templateUrl:'pages/cellular.php'
        })
        .when('/car',{
            templateUrl:'pages/car.php'
        })
        .when('/other',{
            templateUrl:'pages/other.php'
        })
        .when('/loginBtn',{
            templateUrl:'pages/login.php'
        })
        .when('/MyProducts',{
            templateUrl:'pages/sellerProductPage.php'
        })
        .when('/search',{
            templateUrl:'pages/mySearch.php',
        })
        .otherwise({redirectTo: '/'});

})
