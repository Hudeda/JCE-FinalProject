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
    <meta charset="UTF-8">
    <title>login BuyWithFriendSeller</title>
    <script type="text/javascript" src="http://buy-with-friends.com/SellerWeb/js/loginJS.js"></script>

</head>
<body>
<div class="container">

    <div class="row">
        <div class="col-md-8 col-md-offset-2">
        <div class="form-login" id = "MainForm_login">
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
                            <button id="connectSeller" type="button" class="btn btn-primary">אישור</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

</body>