/**
 * Created by hudeda on 02/04/2017.
 */
var app = angular.module('navBarAdmin', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/buyers',{//show buyers clicked
            templateUrl:'pages/buyers.php'
        })
        .when('/sellers',{//show seller clicked
            templateUrl:'pages/sellers.php'
        })
        .when('/product',{//show products clicked
            templateUrl:'pages/products.php'
        })
        .when('/referencesBuyers',{//show message buyer clicked
            templateUrl:'pages/referencesBuyers.php'
        })
        .when('/referencesSellers',{//show message seller clicked
            templateUrl:'pages/referencesSellers.php'
        })
        .when('/referencesUnregistered',{//show message unregistered clicked
            templateUrl:'pages/referencesUnregistered.php'
        })
        .when('/addSeller',{//add seller click
            templateUrl:'pages/addSeller.php',
        })
        .otherwise({redirectTo: '/'});
})
