<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/01/2017
 * Time: 09:04
 */
session_start();
if ($_SESSION["userIdSeller"] == $_POST['companyId']):
require "init.php";

$id = $_POST['id'];
$price = $_POST['price'];


$query = $conn->query("UPDATE productBWF SET Price = $price WHERE ProductId = $id");

if($query)
    echo "1";
else
    echo "0";
mysql_close($conn);
endif;