<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 25/11/2016
 * Time: 00:48
 */
require "init.php";


$userName = $_POST['userName'];
$idProduct = $_POST['idProduct'];


$sql = "INSERT INTO productByUser (idProduct,userName)
VALUES ('$idProduct','$userName')";




if ($conn->query($sql) === TRUE) {
    $conn->query("UPDATE productbwf SET NumberOfJoined = NumberOfJoined + 1 WHERE idProduct = '".$idProduct."'");
    echo true;
} else {
    echo false;
}