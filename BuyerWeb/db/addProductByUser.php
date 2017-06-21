<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 25/11/2016
 * Time: 00:48
 */

//this script add product
session_start();
//check if buyer is register
if (str_replace(' ', '',$_SESSION["userNameBuyer"]) ==  str_replace(' ', '',$_POST['userName'])):

    require "init.php";
    $UserId = $_POST["UserIdBuyer"];
    $idProduct = $_POST["idProduct"];


    $result = $conn->query("SELECT * FROM productByUser WHERE idProduct = '$idProduct' AND UserId ='$UserId'");

    // if thar is no connection between product and user & the user exist so create connection between them
    if($result->num_rows == 0){
        $result = $conn->query("SELECT UserId FROM users WHERE UserId = '$UserId'");
        if ($result->num_rows > 0) {

            $sql = "INSERT INTO productByUser (idProduct,UserId)
VALUES ('$idProduct','$UserId')";

            if ($conn->query($sql) === TRUE) {
                $sql = "UPDATE productBWF SET NumberOfJoined = NumberOfJoined + 1 WHERE ProductId = '$idProduct'";
                if ($conn->query($sql) === TRUE) {
                    echo 1;
                } else {
                    echo 0;
                }
            } else {
                echo 0;
            }
            mysql_close($conn);
        } else {
            //not found
            echo 0;
        }
    }
    else echo 0;


endif;
