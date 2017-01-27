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
    <script type="text/javascript" src="http://hudeda.netau.net/BuyWithFriendsWeb/js/MyCategoryClick.js"></script>


</head>
<body>

<br>
<div id="loader"></div>

<div id = 'categoryText' hidden>פנאי וספורט</div>
<div id="divReplaceByPress"></div>
<div id="myModal"></div>

<div class='se-pre-con'></div>
</body>

</html>