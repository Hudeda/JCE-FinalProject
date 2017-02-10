<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 05/12/2016
 * Time: 23:08
 */
$getProducts = "http://buy-with-friends.com/BuyerWeb/db/getProducts.php";
$getUsersInProductGroup = "http://buy-with-friends.com/BuyerWeb/db/getUsersInProductGroup.php";
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
    <script type="text/javascript" src="http://buy-with-friends.com/BuyerWeb/js/MyCategoryClick.js"></script>


</head>
<body>

<br>
<div id="loader"></div>

<div id = 'categoryText' hidden>מחשבים</div>
<div id="divReplaceByPress"></div>
<div id="myModal"></div>

<div class='se-pre-con'></div>
</body>

</html>