<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 17/01/2017
 * Time: 12:02
 */
$getProducts = "http://hudeda.netau.net/BuyWithFriendsWeb/SellerWeb/db/getProductsForSeller.php";
?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var getProductsForSeller = "<?php echo $getProducts?>";

</script>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script type="text/javascript"
            src="http://hudeda.netau.net/BuyWithFriendsWeb/SellerWeb/js/CategoryClickSeller.js"></script>
</head>
<br>
<div id="loader"></div>

<div id='categoryText' hidden>סלולר</div>

<div id="divReplaceByPress"></div>

<div id="myModal"></div>

</html>
