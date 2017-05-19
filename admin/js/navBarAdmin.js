/**
 * Created by hudeda on 02/04/2017.
 */
var app = angular.module('navBarAdmin', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/buyers',{
            templateUrl:'pages/buyers.php'
        })
        .when('/sellers',{
            templateUrl:'pages/sellers.php'
        })
        .when('/product',{
            templateUrl:'pages/products.php'
        })
        .when('/referencesBuyers',{
            templateUrl:'pages/referencesBuyers.php'
        })
        .when('/referencesSellers',{
            templateUrl:'pages/referencesSellers.php'
        })
        .when('/referencesUnregistered',{
            templateUrl:'pages/referencesUnregistered.php'
        })
        .when('/addSeller',{
            templateUrl:'pages/addSeller.php',
        })
        .otherwise({redirectTo: '/'});
})
