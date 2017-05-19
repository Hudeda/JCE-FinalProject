<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/01/2017
 * Time: 12:03
 */
session_start();
$companyId = $_POST['companyId'];
if ($_SESSION["userIdSeller"] == $companyId):
require "init.php";

$productId = $_POST['productId'];


$result =  $conn->query( "INSERT INTO sellerToProduct (productId, companyId) VALUES ($productId, $companyId)
ON DUPLICATE KEY UPDATE companyId = $companyId");

if($result)
    echo "1";
else
    echo "0";
mysql_close($conn);
endif;
