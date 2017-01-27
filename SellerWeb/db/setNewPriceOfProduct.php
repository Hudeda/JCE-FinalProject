<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/01/2017
 * Time: 09:04
 */

require "init.php";

$id = $_POST['id'];
$price = $_POST['price'];


$query = $conn->query("UPDATE productbwf SET Price = $price WHERE idProduct = $id");

if($query)
    echo "success";
else
    echo "failed";