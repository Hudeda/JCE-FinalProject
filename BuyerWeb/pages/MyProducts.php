<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 06/12/2016
 * Time: 01:15
 */
$getUserProducts = "http://buy-with-friends.com/BuyerWeb/db/getUserProducts.php";
$deleteUserProduct = "http://buy-with-friends.com/BuyerWeb/db/deleteUserProduct.php";

?>
<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    var getUserProducts = "<?php echo $getUserProducts?>";
    var deleteUserProduct = "<?php echo $deleteUserProduct?>"

</script>

<!DOCTYPE html>
<html>
<head>

    <script type="text/javascript" src="http://buy-with-friends.com/BuyerWeb/js/userProduct.js"></script>
    <link rel="stylesheet" href="http://buy-with-friends.com/BuyerWeb/css/userProducts.css">

</head>
<body>

<br>
<div id="loader"></div>

<div class="rtlStyle" hidden><span class="label label-primary titlesUserProducts">קבוצות בשלב איסוף אנשים:</span><br></div>
<div id='appendItemPeople'></div>
<div class="rtlStyle" ><span class="label label-primary titlesUserProducts">קבוצות בשלב קבלת הצעות:</span><br></div>
<div id='appendItemOffers'></div>
<div class="rtlStyle" ><span class="label label-primary titlesUserProducts">קבוצות שהמכרז שלהם הסתיים:</span><br></div>
<div id='appendItemClosed'></div>
</body>


</html>

