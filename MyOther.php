<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 05/12/2016
 * Time: 23:08
 */
$getProducts = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getProducts.php";
$getUsersInProductGroup = "http://hudeda.netau.net/BuyWithFriendsWeb/db/getUsersInProductGroup.php";
?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var getProducts = "<?php echo $getProducts?>";
    var getUsersInProductGroup = "<?php echo $getUsersInProductGroup?>";

</script>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>

    <script type="text/javascript" src="js/MyCategoryClick.js"></script>
    <link rel="stylesheet" href="css/one_product.css">

</head>

<div id = 'categoryText' hidden>שונות</div>
<div id="divReplaceByPressElectricity"></div>

<div class='se-pre-con'></div>

</html>