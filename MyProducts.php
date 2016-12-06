<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 06/12/2016
 * Time: 01:15
 */
$getUserProducts = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUserProducts.php";
$deleteUserProduct = "http://hudeda.netau.net/BuyWithFriendsWeb/db/deleteUserProduct.php";

?>
<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    var getUserProducts = "<?php echo $getUserProducts?>";
    var deleteUserProduct = "<?php echo $deleteUserProduct?>"

</script>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/userProducts.css">

    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>

    <script type="text/javascript" src="js/userProduct.js"></script>

</head>

<div id="divUserProducts"></div>
<div class='titlesUserProducts'>קבוצות בשלב איסוף אנשים:</div>
<div id='appendItemPeople'></div>
<div class='titlesUserProducts'>קבוצות בשלב קבלת הצעות:</div>
<div id='appendItemOffers'></div>
<div class='titlesUserProducts'>קבוצות שהמכרז שלהם הסתיים:</div>
<div id='appendItemClosed'></div>
<div class='se-pre-con'></div>


</html>

