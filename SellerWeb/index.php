<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/12/2016
 * Time: 18:09
 */
session_start();
//Src php files for database functionality
$connectCompany = "http://buy-with-friends.com/SellerWeb/db/connectCompany.php";
$getProducts = "http://buy-with-friends.com/BuyerWeb/db/getProducts.php";
$setNewPriceOfProduct = "http://buy-with-friends.com/SellerWeb/db/setNewPriceOfProduct.php";
$getProductOfSeller = "http://buy-with-friends.com/SellerWeb/db/getProductOfSeller.php";
$changeSellerOfProduct = "http://buy-with-friends.com/SellerWeb/db/changeSellerOfProduct.php";
$sendReferences = "http://buy-with-friends.com/BuyerWeb/db/sendReferences.php";
$endSessionSeller = "http://buy-with-friends.com/SellerWeb/db/endSessionSeller.php";
$searchProductSeller = "http://buy-with-friends.com/SellerWeb/db/searchProductSeller.php";
?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var connectCompany = "<?php echo $connectCompany ?>";
    var getProducts = "<?php echo $getProducts?>";
    var setNewPriceOfProduct = "<?php echo $setNewPriceOfProduct?>";
    var changeSellerOfProduct = "<?php echo $changeSellerOfProduct?>";
    var sendReferencesUrl = "<?php echo $sendReferences?>";
    var endSessionSeller = "<?php echo $endSessionSeller?>";
    var searchProductSellerUrl = "<?php echo $searchProductSeller?>";

</script>

<!DOCTYPE html>
<html ng-app="myApp">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA)Compatible" content="IE-edge">
    <meta name="viewport" content="width = device-width,initial-scale = 1">
    <link rel="shortcut icon" type="image/x-icon" href="../BuyerWeb/image/logoBWF.png"/>

    <title>Buy With Friends Seller</title>

    <!-- Import of javascript URL -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="http://buy-with-friends.com/js/sweetalert2.min.js"></script>

    <!-- Import of css files -->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/sellerWeb.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/login-style.css">
    <link rel="stylesheet" type="text/css" href="http://buy-with-friends.com/css/sweetalert2.min.css">

    <!-- Import of javascript files -->
    <script type="text/javascript" src="js/navigationHandle.js"></script>
    <script type="text/javascript" src="js/sellerWeb.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js"></script>

</head>

<nav>
</nav>

<body>

<!-- Collapsible Navigation Bar -->
<div class="container">

    <!-- .navbar-fixed-top, or .navbar-fixed-bottom can be added to keep the nav bar fixed on the screen -->
    <nav class="navbar navbar-default">
        <div class="container-fluid">

            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">

                <!-- Button that toggles the navbar on and off on small screens -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">

                    <!-- Hides information from screen readers -->
                    <span class="sr-only"></span>

                    <!-- Draws 3 bars in navbar button when in small mode -->
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- You'll have to add padding in your image on the top and right of a few pixels (CSS Styling will break the navbar) -->
                <a class="pull-left" href="#"><img id="navlogo" src="../BuyerWeb/image/logoBWF.png"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">בית<span class="sr-only">(current)</span></a></li>
                    <?php if (isset($_SESSION["userIdSeller"])): ?>
                        <li><a href="" id="deleteSession">התנתק</a></li>
                        <li><a href="#/MyProducts" id="MyProducts">הפריטים שלי</a></li>
                    <?php else: ?>
                        <li><a id="loginBtn" href="#/loginBtn">התחברות</a></li>
                    <?php endif; ?>

                    <li class="dropdown">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">צור קשר<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="">דוא"ל</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="" data-toggle='modal' data-target='#mySellerReferencesModal'>פניות באתר</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- navbar-left will move the search to the left -->
                <form class="navbar-form navbar-right input-group" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search" id="inputSearchSeller">
                        <ul class="nav navbar-nav">
                            <a href="#/search" role="button" class="btn btn-default" id="searchProductSeller">חיפוש</a>
                        </ul>
                    </div>
                </form>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <?php if (isset($_SESSION["userIdSeller"])): ?>
        <!-- Categories filters -->
        <div class="divCategory text-center">
            <div class="btn-group">
                <a href="#/other" type="button" class="btn btn-primary">שונות</a>
                <a href="#/car" type="button" class="btn btn-primary">רכב</a>
                <a href="#/cellular" type="button" class="btn btn-primary">סלולר</a>
                <a href="#/sport" type="button" class="btn btn-primary">פנאי וספורט</a>
                <a href="#/computer" type="button" class="btn btn-primary">מחשבים</a>
                <a href="#/tourist" type="button" class="btn btn-primary">תיירות</a>
                <a href="#/pages/electricity" type="button" class="btn btn-primary">חשמל ואלקטרוניקה</a>
            </div>
        </div>
    <?php endif; ?>
    <div class='modal fade' id='mySellerReferencesModal' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> פניה באתר </h4></div>
                <div class='modal-body'>
                    <p>שם: <input id="userNameSendingInput" class='form-control' type='text'></p>
                    <p>כותרת: <input id="titleSendingInput" class='form-control' type='text'></p>
                    <p>הודעה: <textarea class="form-control" id="messageTextarea" rows="4"></textarea></p>
                </div>
                <div class='modal-footer'>
                    <div class='col-xs-5'><br>
                        <button id="sendReferences" type='button' class='btn btn-success'>שלח</button>
                    </div>
                    <br>
                    <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>

    <div ng-view></div>

</div>

</body>

</html>