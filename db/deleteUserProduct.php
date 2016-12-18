<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 06/12/2016
 * Time: 04:50
 */
require "init.php";

$productId = $_POST['productId'];
$userName = $_POST['userName'];

$pass = sha1($password);


$sql = "DELETE FROM productByUser WHERE idProduct = '$productId' AND userName = '$userName' LIMIT 1";


if ($conn->query($sql) === TRUE) {
    $conn->query("UPDATE productbwf SET NumberOfJoined = (NumberOfJoined - 1) WHERE idProduct = '".$productId."'");
    echo true;
} else {
    echo false;
}
