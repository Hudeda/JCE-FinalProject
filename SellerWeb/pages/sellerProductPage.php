<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 17/01/2017
 * Time: 12:03
 */
$getProductsOfSeller = "http://buy-with-friends.com/SellerWeb/db/getProductOfSeller.php";

?>

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    //for script files that send POST request to php files
    var getProductsOfSeller = "<?php echo $getProductsOfSeller?>";


</script>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="http://buy-with-friends.com/SellerWeb/js/sellerProductPageJS.js"></script>
    
</head>
<br>
<div id="divReplaceByPress"></div>

<div id ="myModalDisplayForSeller"></div>

</html>
