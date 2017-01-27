<?php

//the connection between other php files to send and get from server.

$addRegister = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addRegister.php";
$getUserNamePassToConnection = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUserNamePassToConnection.php";
$addProductDb = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addProductDb.php";
$sendEmail = "http://hudeda.netau.net/BuyWithFriendsWeb/db/sendEmail.php";
$addProductByUser = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addProductByUser.php";

?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var addRegister = "<?php echo $addRegister ?>";
    var getUserNamePassToConnection = "<?php echo $getUserNamePassToConnection?>";
    var addProductDb = "<?php echo $addProductDb?>";
    var sendEmail = "<?php echo $sendEmail?>";
    var addProductByUserDB = "<?php echo $addProductByUser?>";


</script>

<!DOCTYPE html>
<html ng-app="myApp1">
<head>
    <meta charset="UTF-8">
    <!--    Including all the stylesheets and scripts files are been used on this app-->
    <meta http-equiv="X-UA)Compatible" content="IE-edge">
    <meta name="viewport" content="width = device-width,initial-scale = 1">
    <title>Buy With Friends</title>
    <link rel="shortcut icon" type="image/x-icon" href="image/logoBWF.png"/>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/js/bootstrap-select.js"></script>
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/css/bootstrap-select.min.css">


    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script type="text/javascript" src="js/register.js"></script>
    <script type="text/javascript" src="js/addProduct.js"></script>
    <script type="text/javascript" src="js/getProductByCatagory.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/one_product.css">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js"></script>


</head>

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
                <a class="pull-left" href="#"><img src="image/logoBWF.png"></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">בית<span class="sr-only">(current)</span></a></li>
                    <li><a href="" id="loginBtn" data-target='#myLogin'>התחברות</a></li>
                    <li><a href="" id="addProduct" hidden data-toggle='modal'
                           data-target='#addProductModal'>הוספת פריט</a></li>
                    <li><a href="#/userProduct" id="userProduct" hidden>הפריטים שלי</a></li>
                    <li class="dropdown">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">צור קשר<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="">דוא"ל</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="">פניות באתר</a></li>
                        </ul>
                    </li>
                </ul>
                <!-- navbar-left will move the search to the left -->
                <form class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">חיפוש</button>
                </form>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div class="divCategory text-center">
        <div class="btn-group">
            <a href="#/other" type="button" class="btn btn-primary">שונות</a>
            <a href="#/car" type="button" class="btn btn-primary">רכב</a>
            <a href="#/cellular" type="button" class="btn btn-primary">סלולר</a>
            <a href="#/sport" type="button" class="btn btn-primary">פנאי וספורט</a>
            <a href="#/computer" type="button" class="btn btn-primary">מחשבים</a>
            <a href="#/tourist" type="button" class="btn btn-primary">תיירות</a>
            <a href="#/electricity" type="button" class="btn btn-primary">חשמל ואלקטרוניקה</a>
        </div>
    </div>
    <div class='modal fade' id='myLogin' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> התחברות </h4></div>
                <div class='modal-body'>
                    <p>שם משתמש: <input id="userNameConnection" class='form-control' id='ex1' type='text'></p><br>
                    <p>סיסמא:<input id="userPassConnection" class='form-control' id='ex1' type='password'></p></div>
                <div class='modal-footer'>
                    <div class='col-xs-5'><br>
                        <button id="userConnectionB" type='button' class='btn btn-success'>התחבר</button>
                        <button type='button' class='btn btn-danger' data-toggle='modal' data-target='#myRegistration'>
                            הירשם
                        </button>
                    </div>
                    <br>
                    <button id="forgotPassword" type='button' class='btn btn-warning' data-toggle='modal' data-target='#myForgotPasswordModal'>?שכחת סיסמא</button>

                    <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class='modal fade' id='myRegistration' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> הרשמה </h4></div>
                <div class='modal-body'>
                    <p>שם פרטי: <input id="firstNameRegistration" class='form-control' id='ex1' type='text'></p>
                    <p>שם משפחה: <input id="lastNameRegistration" class='form-control' id='ex1' type='text'></p>
                    <p>שם משתמש: <input id="userNameRegistration" class='form-control' id='ex1' type='text'></p>
                    <p>מספר טלפון: <input id="userPhoneRegistration" class='form-control' id='ex1' type='tel'
                                          maxlength='10'></p>
                    <p>אימייל: <input id="userEmailRegistration" class='form-control' id='ex1' type='email'></p>
                    <p>סיסמא: <input id="pass1Registration" class='form-control' id='ex1' type='password'></p>
                    <p>אימות סיסמא: <input id="pass2Registration" class='form-control' id='ex1' type='password'></p>
                </div>
                <div class='modal-footer'>
                    <div class='col-xs-5'><br>
                        <button id="userRegisterBregister" type='button' class='btn btn-success'>הירשם</button>
                    </div>
                    <br>
                    <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class='modal fade' id='myForgotPasswordModal' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> שכחתי שם משתמש/סיסמא </h4></div>
                <div class='modal-body'>
                    <p>אימייל: <input id="emailSendingInput" class='form-control' id='ex1' type='email'></p>
                </div>
                <div class='modal-footer'>
                    <div class='col-xs-5'><br>
                        <button id="emailSendingButto" type='button' class='btn btn-success'>שלח סיסמא חדשה</button>
                    </div>
                    <br>
                    <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>


    <div class='modal fade' id='addProductModal' role='dialog'>
        <div class='modal-dialog'>

            <div class='modal-content'>
                <div class='modal-header'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'> הוספת פריט </h4></div>
                <div class='modal-body'>
                    <p>שם מוצר: <input id="productName" class='form-control' id='ex1' type='text'></p>
                    <p>שם חברה: <input id="companyName" class='form-control' id='ex1' type='text'></p>
                    <p>תיאור מוצר: <input id="descriptionProduct" class='form-control' id='ex1' type='text'></p>
                    <p>מספר שבועות לאיסוף אנשים: <input id="numberOfAddPeople" class='form-control' id='ex1' type='tel'
                                                        maxlength='10'></p>
                    <p>מספר שבועות לקבלת הצעות: <input id="numberForGetOffer" class='form-control' id='ex1'
                                                       type='email'></p>
                    <p>בחר קטגוריה: <select id="selectCategory" class="selectpicker">
                            <optgroup label="בחר קטגוריה:">
                                <option>חשמל ואלקטרוניקה</option>
                                <option>תיירות</option>
                                <option>מחשבים</option>
                                <option>פנאי וספורט</option>
                                <option>סלולר</option>
                                <option>רכב</option>
                                <option>שונות</option>
                            </optgroup>
                        </select>
                    </p>
                    <p> העלאת תמונה:
                        <input type="file" class="image-upload"/>
                    <div class="images"></div>
                    </p>
                    <div class='modal-footer'>
                        <div class='col-xs-5'><br>
                            <button id="addProductBuyUser" type='button' class='btn btn-primary'>הוספת פריט</button>

                        </div>
                        <br>
                        <button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <body>

    <div ng-view></div>

    </body>
</div>

</html>


