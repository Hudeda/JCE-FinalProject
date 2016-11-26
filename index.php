<?php

//the connection between other php files to send and get from server.

$addRegister = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addRegister.php";
$getUserNamePassToConnection = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUserNamePassToConnection.php";
$addProductDb = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addProductDb.php";
$sendEmail = "http://hudeda.netau.net/BuyWithFriendsWeb/db/sendEmail.php";
$getProducts = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getProducts.php";
$addProductByUser = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addProductByUser.php";
$addProductByUser = "http://hudeda.netau.net/BuyWithFriendsWeb/db/addProductByUser.php";
$getUsersInProductGroup = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUsersInProductGroup.php";
$getUserProducts = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUserProducts.php";

?>
<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var addRegister = "<?php echo $addRegister ?>";
    var getUserNamePassToConnection = "<?php echo $getUserNamePassToConnection?>";
    var addProductDb = "<?php echo $addProductDb?>";
    var sendEmail = "<?php echo $sendEmail?>";
    var getProducts = "<?php echo $getProducts?>";
    var addProductByUserDB = "<?php echo $addProductByUser?>";
    var getUsersInProductGroup = "<?php echo $getUsersInProductGroup?>";
    var getUserProducts = "<?php echo $getUserProducts?>";

</script>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!--    Including all the stylesheets and scripts files are been used on this app-->
    <title>Buy With Friends</title>
    <link rel="stylesheet" href="css/entry.css">
    <link rel="stylesheet" href="css/register.css">
    <link rel="stylesheet" href="css/one_product.css">
    <link rel="shortcut icon" type="image/x-icon" href="image/logoBWF.png"/>

    <script
        src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
    <script type="text/javascript" src="js/register.js"></script>
    <script type="text/javascript" src="js/addProduct.js"></script>
    <script type="text/javascript" src="js/userProduct.js"></script>
    <script type="text/javascript" src="js/navBar.js"></script>
    <script type="text/javascript" src="js/getProductByCatagory.js"></script>


</head>
<!--logo on the Tab next to name app-->
<div icon id="icon">
    <a href=""><img style="width:100px" src="image/logoBWF.png" type="image"></a>


</div>

<!--nav bar - all the category in app and adding product button -->
<nav>
    <ul>
        <div id ="addProducthid" hidden><li><label id="navAddItemTag">הוספת פריט</label></li>
        <li><label id="userProductsDiv">הפריטים שלי</label></li></div>
        <li><label id="navOtherTag">שונות</label></li>
        <li><label id="navMyCarTag">רכב</label></li>
        <li><label id="navMyCellularTag">סלולר</label></li>
        <li><label id="navMySportTag">פנאי וספורט</label></li>
        <li><label id="navMyComputerTag">מחשבים</label></li>
        <li><label id="navTouristTag">תיירות</label></li>
        <li><label id="navMyElectricityTag">חשמל ואלקטרוניקה</label></li>
    </ul>
</nav>

<!--connection and disconnection users -->
<div class="loginLink">
    <span>שלום </span>
    <div id="nameOfUser" class="userName"><span></span></div>
    <span>, </span>
    <div id="connect" style="color: #1a1aff; text-decoration: underline;"></div>
</div>


<body>

<!--20 product are slideing on the rigth side on first window-->
<div id="divChanges">
    <br>
    <div class="newsProduct">
        20 פריטים חדשים
    </div>

    <!--Explains how the app works why we need this app-->

    <div class="mainDiv">
        איך זה עובד מה צריך לעשות
    </div>
</div>
<!--this div replaced by click on category on nav bar-->
<div id="divReplaceByPress" hidden></div>
<!--ths div show the details by press on any product-->
<div id="DivShowDetails" hidden></div>
<!--this div is the loading view-->
<div class="se-pre-con" hidden></div>

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
                        <input id ="userNameConnection" type="text" placeholder="הכנס שם משתמש" required>

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
                        <input type='file' onchange="readURL(this);" required>
                        <img id="blah" src="#" alt="your image" hidden/>


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


