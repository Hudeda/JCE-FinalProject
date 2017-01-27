<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/01/2017
 * Time: 12:03
 */

require "init.php";

$companyId = $_POST['companyId'];
$productId = $_POST['productId'];


$result =  $conn->query( "INSERT INTO sellerToProduct (productId, companyId) VALUES ($productId, $companyId)
ON DUPLICATE KEY UPDATE companyId = $companyId");

if($result)
    echo "success";
else
    echo "failed";