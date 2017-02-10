<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 16/01/2017
 * Time: 20:06
 */
$connectCompany = "http://buy-with-friends.com/SellerWeb/db/connectCompany.php";

?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var connectCompany = "<?php echo $connectCompany ?>";

</script>

<!DOCTYPE html>
<head>

    <title>login BuyWithFriendSeller</title>
    <link rel="stylesheet" type="text/css" href="../css/login-style.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>

    <script type="text/javascript" src="../js/loginJS.js"></script>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

</head>
<body>
<div class="container">

    <div class="row">
        <div class="col-xs-offset-3 col-sm-offset-4 col-md-offset-4 col-xs-6 col-sm-6 col-md-4 col-lg-4">
            <div class="form-login">
                <form action="" method="POST" calss="form-horizontal" role="form">
                    <div class="form-group">
                        <legend>התחברות</legend>
                    </div>
                    <div class="form-login">
                        <div class="col-sm-9">
                            <input type="text" name="" id="inputNumId" class="form-control" value="" required="required"
                                  >
                        </div>
                        <label class="control-label col-sm-3">:מזהה</label>

                    </div>
                    <div class="form-login">
                        <div class="col-sm-9">
                            <input type="password" name="" id="inputPassword" class="form-control" value="" required="required"
                                   >
                        </div>
                        <label class="control-label col-sm-3">:סיסמא</label>

                    </div>


                    <div class="form-login">
                        <div class="col-sm-10 col-sm-offset-2">
                            <button id="connectSeller" type="submit" class="btn btn-primary">אישור</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
</div>


</body>