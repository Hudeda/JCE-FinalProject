<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 27/03/2017
 * Time: 17:56
 */
session_start();

$connection = "http://buy-with-friends.com/admin/db/connection.php";
$getUsers = "http://buy-with-friends.com/admin/db/getUsers.php";
$getProducts = "http://buy-with-friends.com/admin/db/getProducts.php";
$deleteUserFromDatabaseUrl = "http://buy-with-friends.com/admin/db/deleteUserFromDatabase.php";
$deleteSellerFromDatabaseUrl = "http://buy-with-friends.com/admin/db/deleteSellerFromDatabaseUrl.php";
$getSellers = "http://buy-with-friends.com/admin/db/getSellers.php";
$addSellerDatabase = "http://buy-with-friends.com/admin/db/addSellerDatabase.php";
$showReferencesBuyerURL = "http://buy-with-friends.com/admin/db/showReferencesBuyer.php";
$showReferencesSellerURL = "http://buy-with-friends.com/admin/db/showReferencesSeller.php";
$referencesUnregisteredURL = "http://buy-with-friends.com/admin/db/referencesUnregistered.php";
$endSession = "http://buy-with-friends.com/admin/db/endSession.php";
$deleteProduct = "http://buy-with-friends.com/admin/db/deleteProduct.php";

?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    var connection = "<?php echo $connection ?>";
    var getUsers = "<?php echo $getUsers ?>";
    var getProducts = "<?php echo $getProducts ?>";
    var deleteUserFromDatabaseUrl = "<?php echo $deleteUserFromDatabaseUrl ?>";
    var deleteSellerFromDatabaseUrl = "<?php echo $deleteSellerFromDatabaseUrl ?>";
    var showReferencesBuyerURL = "<?php echo $showReferencesBuyerURL ?>";
    var showReferencesSellerURL = "<?php echo $showReferencesSellerURL ?>";
    var referencesUnregisteredURL = "<?php echo $referencesUnregisteredURL ?>";
    var endSession = "<?php echo $endSession ?>";
    var getSellers = "<?php echo $getSellers ?>";
    var addSellerDatabase = "<?php echo $addSellerDatabase ?>";
    var deleteProductDB = "<?php echo $deleteProduct ?>";

</script>

<!DOCTYPE html>
<html dir="rtl" lang="he" ng-app="navBarAdmin">
<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" type="image/x-icon" href="../BuyerWeb/image/logoBWF.png"/>

    <title>Buy With Friends Admin</title>

    <!-- Import of javascript URL -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="js/connection.js"></script>
    <script type="text/javascript" src="js/navBarAdmin.js"></script>
    <script src="http://buy-with-friends.com/js/sweetalert2.min.js"></script>


    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/adminStayle.css">
    <link rel="stylesheet" type="text/css" href="http://buy-with-friends.com/css/sweetalert2.min.css">


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="container">
<!--     if admin connected show the nav side   -->
    <?php if (isset($_SESSION["userNameAdmin"])): ?>
        <div class="modal-body row">
            <div class="col-md-12 btnConnect">
                <button type="submit" class="btn btn-default" id="endConnection">התנתק</button>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-2">

                <nav class="navbar navbar-default sidebar" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse"
                                    data-target="#bs-sidebar-navbar-collapse-1">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                            <ul class="nav navbar-nav ">
                                <li class="active"><a href="#">Home<span style="font-size:16px;"
                                                                         class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle" data-toggle="dropdown"> משתמשים <span
                                                class="caret"></span><span style="font-size:16px;"
                                                                           class="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                                    <ul class="dropdown-menu forAnimate" role="menu">
                                        <li><a href="#/sellers">מוכרים</a></li>
                                        <li><a href="#/buyers">רוכשים</a></li>
                                    </ul>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle" data-toggle="dropdown"> הודעות <span
                                                class="caret"></span><span style="font-size:16px;"
                                                                           class="pull-right hidden-xs showopacity glyphicon glyphicon-envelope"></span></a>
                                    <ul class="dropdown-menu forAnimate" role="menu">
                                        <li><a href="#/referencesSellers"> מוכרים </a></li>
                                        <li><a href="#/referencesBuyers"> רוכשים </a></li>
                                        <li><a href="#/referencesUnregistered"> לא רשום </a></li>
                                    </ul>
                                </li>
                                <li><a href="#/addSeller"> הוספת מוכר <span style="font-size:16px;"
                                                                            class="pull-right hidden-xs showopacity glyphicon glyphicon-plus-sign"></span></a>
                                </li>
                                <li><a href="#/product"> מוצרים <span style="font-size:16px;"
                                                                      class="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div ng-view class="col-md-10" id="View"></div>
        </div>
    <?php else: ?>
        <div class="modal-body row">
            <div class="col-md-12 btnConnect">
                <button type="submit" class="btn btn-default" data-toggle='modal' data-target="#myAdminLogin"
                        id="connection">התחברות
                </button>
            </div>
        </div>
    <?php endif; ?>

    <!-- popup windows for connection -->
    <div class='modal fade' id='myAdminLogin' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> התחברות </h4></div>
                <div class='modal-body'>
                    <p>שם משתמש: <input id="userNameConnection" class='form-control' type='text'></p><br>
                    <p>סיסמא:<input id="userPassConnection" class='form-control' type='password'></p></div>
                <div class='modal-footer'>
                    <div class='col-xs-5'><br>
                        <button id="userConnection" type='button' class='btn btn-success'>התחבר</button>
                    </div>
                    <br>
                    <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>


</html>

