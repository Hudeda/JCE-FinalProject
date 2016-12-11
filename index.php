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
<html  ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <!--    Including all the stylesheets and scripts files are been used on this app-->
    <title>Buy With Friends</title>
    <link rel="stylesheet" href="css/entry.css">
    <link rel="stylesheet" href="css/register.css">
    <link rel="stylesheet" href="css/one_product.css">
    <link rel="shortcut icon" type="image/x-icon" href="image/logoBWF.png"/>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
    
    <script type="text/javascript" src="js/register.js"></script>
    <script type="text/javascript" src="js/addProduct.js"></script>
    <script type="text/javascript" src="js/navBar.js"></script>
    <script type="text/javascript" src="js/entry.js"></script>
    <script type="text/javascript" src="js/getProductByCatagory.js"></script>


    <meta name="viewport" content="width=device-width, initial-scale=1.0">


</head>

<!--connection and disconnection users -->
<br>
<div class="loginLink" >
    <span>שלום </span>
    <div id="nameOfUser" class="userName"><span></span></div>
    <span>, </span>
    <a><div id="connect" style="color: #1a1aff; text-decoration: underline;"></div></a>
</div>
<br>
<!--nav bar - all the category in app and adding product button -->
<nav>
    <div id="ulSmall">
        <br>
        <a href="#/electricity" id="navMyElectricityTaga"><li class="liSmall">חשמל ואלקטרוניקה</li></a>
        <a href="#/tourist" id="navTouristTaga"><li class="liSmall">תיירות</li></a>
        <a href="#/computer" id="navMyComputerTaga"><li class="liSmall">מחשבים</li></a>
        <a href="#/sport" id="navMySportTaga"><li class="liSmall">פנאי וספורט</li></a>
        <a href="#/cellular" id="navMyCellularTaga"><li class="liSmall">סלולר</li></a>
        <a href="#/car" id="navMyCarTaga"><li class="liSmall">רכב</li></a>
        <a href="#/other" id="navOtherTaga"><li class="liSmall">שונות</li></a>
        <br><br>
        <div id="addProducthida" hidden>
            <li class="liSmall"><label id="navAddItemTaga">הוספת פריט</label></li>
            <a href="#/userProduct" id="userProductsDiva"><li class="liSmall">הפריטים שלי</li></a>
        </div>
    </div>
    <br>
    <ul id="ulBig">
        <div id="addProducthid" hidden>
            <li class="liBig"><label id="navAddItemTag">הוספת פריט</label></li>
            <a href="#/userProduct" id="userProductsDiv"><li class="liBig">הפריטים שלי</li></a>
        </div><br>
        <a href="#/other" id="navOtherTag"><li class="liBig">שונות</li></a>
        <a href="#/car" id="navMyCarTag"><li class="liBig">רכב</li></a>
        <a href="#/cellular" id="navMyCellularTag"><li class="liBig">סלולר</li></a>
        <a href="#/sport" id="navMySportTag"><li class="liBig">פנאי וספורט</li></a>
        <a href="#/computer" id="navMyComputerTag"><li class="liBig">מחשבים</li></a>
        <a href="#/tourist" id="navTouristTag"><li class="liBig">תיירות</li></a>
        <a href="#/electricity" id="navMyElectricityTag"><li class="liBig">חשמל ואלקטרוניקה</li></a>
    </ul>
</nav>

<br>
<br>


<body>

<!--20 product are slideing on the rigth side on first window-->
<div id="divChanges">
    <br>
    <div class="newsProduct"></div>

    <!--Explains how the app works why we need this app-->

    <div class="mainDiv">
        איך זה עובד מה צריך לעשות
    </div>
</div>
<div ng-view></div>
<!--ths div show the details by press on any product-->
<div id="DivShowDetails" hidden></div>
<!--this div is the popup windows are show the connection view -->
<div id="popupBoxOnePosition">
    <div class="popupBoxWrapper">
        <div class="popupBoxContent">
            <div class="container">

                <form>
                    <div class="imgcontainer">
                        <img src="image/logoBWF.png" alt="Avatar" class="avatar">
                    </div>

                    <div class="container">
                        <label><b>שם משתמש:</b></label>
                        <input id="userNameConnection" type="text" placeholder="הכנס שם משתמש" required>

                        <label><b>סיסמה</b></label>
                        <input id="userPassConnection" type='password' placeholder="הכנס סיסמה" required>

                        <img id="connection" style="width:100px" src="image/connectio.png"/>
                        <img id="register" style="width:100px" src="image/registrationRed.png"/>

                    </div>

                    <div class="containerBtn">
                        <input id="cancel" src="image/red%20icon.png" type="image">

                    </div>
                    <span class="psw">שחכת <label id="forgetPassword">סיסמה?</label></span>

                </form>

            </div>
            &#8203;
        </div>
    </div>
</div>

<!--this div is the popup windows are show the send email view-->
<div id="sendEmailDiv">
    <div class="popupBoxWrapper">
        <div class="popupBoxContent">
            <div class="container">

                <form>
                    <div class="container">

                        <label><b>אימייל:</b></label>
                        <input id="emailSendingInput" type="text" placeholder="הכנס אימייל" required>

                    </div>
                    <div class="registerGreen">
                        <img id="emailSendingButto" style="width:50px" src="image/green%20icon.png"/>
                    </div>
                    <div class="registerRed">
                        <img id="emailSendingCancel" style="width:50px" src="image/red%20icon.png"/>
                    </div>
                </form>

            </div>
            &#8203;
        </div>
    </div>
</div>


<!--this div is the popup windows are show the user register view-->

<div id="popupRegister">
    <div class="popupBoxWrapper">
        <div class="popupBoxContent">
            <div class="container">

                <form>
                    <div class="container">

                        <label><b>שם פרטי:</b></label>
                        <input id="firstNameRegistration" type="text" placeholder="הכנס שם פרטי" required>
                        <label><b>שם משפחה:</b></label>
                        <input id="lastNameRegistration" type="text" placeholder="הכנס שם משפחה" required>
                        <label><b>שם משתמש:</b></label>
                        <input id="userNameRegistration" type="text" placeholder="הכנס שם משתמש" required>
                        <label><b>אימייל</b></label>
                        <input id="userEmailRegistration" type="text" placeholder="הכנס אימייל" required>
                        <label><b>מספר טלפון:</b></label>
                        <input id="userPhoneRegistration" type="text" placeholder="הכנס מספר טלפון" required>
                        <label><b>סיסמה:</b></label>
                        <input id="pass1Registration" type='password' placeholder="הכנס סיסמה"/>
                        <label><b>אימות סיסמה:</b></label>
                        <input id="pass2Registration" type='password' placeholder="הכנס אימות סיסמה"/>


                    </div>
                    <div class="registerGreen">
                        <img id="registerGreenID" style="width:50px" src="image/green%20icon.png"/>
                    </div>
                    <div class="registerRed">
                        <img id="registerRedID" style="width:50px" src="image/red%20icon.png"/>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>

<!--this div is the popup windows are show the adding product group view-->
<div id="addProductDiv">
    <div class="popupBoxWrapper">
        <div class="popupBoxContent">
            <div class="container">

                <form>
                    <div class="container">

                        <label><b>שם החברה:</b></label>
                        <input id="companyName" type="text" placeholder="הכנס את שם החברה" required>
                        <label><b>שם המוצר:</b></label>
                        <input id="productName" type="text" placeholder="הכנס את שם מוצר" required>
                        <label><b>תיאור המוצר:</b></label>
                        <input id="descriptionProduct" type="text" placeholder="תאר את המוצר" required>
                        <label><b>מספר השבועות לאסוף אנשים:</b></label>
                        <input id="numberOfAddPeople" type="number" min="1" placeholder="הכנס מספר השבועות לאסוף אנשים"
                               required>
                        <label><b>מספר השבועות לקבלת הצעות:</b></label>
                        <input id="numberForGetOffer" type="number" min="1" placeholder="הכנס מספר השבועות לקבלת הצעות"
                               required>
                        <label><b>קטגוריה:</b></label>
                        <select id="selectCategory">
                            <option value="בחר קטגוריה">בחר קטגוריה:</option>
                            <option value="חשמל ואלקטרוניקה">חשמל ואלקטרוניקה</option>
                            <option value="תיירות">תיירות</option>
                            <option value="מחשבים">מחשבים</option>
                            <option value="פנאי וספורט">פנאי וספורט</option>
                            <option value="סלולר">סלולר</option>
                            <option value="רכב">רכב</option>
                            <option value="שונות">שונות</option>
                        </select>
                        <br>
                        <label><b>צקף תמונה</b></label>
                        <input type="file" class="image-upload"/>


                    </div>
                    <div class="registerGreen">
                        <input id="addProduct" style="width:50px" src="image/green%20icon.png" type="image">
                    </div>
                    <div class="registerRed">
                        <input id="cancelAddProduct" style="width:50px" src="image/red%20icon.png" type="image">
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>

</body>
</html>


