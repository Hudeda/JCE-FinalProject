<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 06/12/2016
 * Time: 04:50
 */

//this script remove the connection between buyer and product
session_start();
//check if the buyer connrcted
if (str_replace(' ', '',$_SESSION["userNameBuyer"]) ==  str_replace(' ', '',$_POST['userName'])):

    require "init.php";
//get data from html
    $productId = $_POST['productId'];
    $UserId = $_POST['UserId'];


    $sql = "DELETE FROM productByUser WHERE idProduct = '$productId' AND UserId = '$UserId' LIMIT 1";

    if ($conn->query($sql) === TRUE) {
        $sql = "UPDATE productBWF SET NumberOfJoined = (NumberOfJoined - 1) WHERE ProductId = '$productId'";
        if ($conn->query($sql) === TRUE)
            echo 1;
        else
            echo 0;

    } else {
        echo 0;
    }
    mysql_close($conn);
endif;
