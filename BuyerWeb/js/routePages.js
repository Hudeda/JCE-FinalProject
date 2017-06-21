/**
 * Created by hudeda on 21/11/2016.
 */
var app = angular.module('myApp1', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/electricity',{// get page of electricity
            templateUrl:'pages/MyElectricity.php'
        })
        .when('/tourist',{// get page of tourist
            templateUrl:'pages/MyTourist.php'
        })
        .when('/computer',{// get page of computer
            templateUrl:'pages/MyComputer.php'
        })
        .when('/sport',{// get page of sport
            templateUrl:'pages/MySport.php'
        })
        .when('/cellular',{// get page of cellular
            templateUrl:'pages/MyCellular.php'
        })
        .when('/car',{// get page of car
            templateUrl:'pages/MyCar.php'
        })
        .when('/other',{// get page of other
            templateUrl:'pages/MyOther.php'
        })
        .when('/userProduct',{// get page of products
            templateUrl:'pages/MyProducts.php',
        })
        .when('/search',{// get page of search
            templateUrl:'pages/MySearch.php',
        })
        .when('/',{// get page of home page
            templateUrl:'pages/MyHomePage.php',
        })
        .otherwise({redirectTo: '/'});
})
