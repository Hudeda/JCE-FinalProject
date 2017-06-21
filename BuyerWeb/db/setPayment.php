<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 03/06/2017
 * Time: 15:48
 */

//this script for the payment of product

session_start();
//check if buyer is connected
if (str_replace(' ', '', $_SESSION["userNameBuyer"]) == str_replace(' ', '', $_POST['userName'])):

    require "init.php";

    $productId = $_POST['productId'];
    $userId = $_POST['userId'];

    $result =  $conn->query( "SELECT * FROM productByUser WHERE idProduct = '$productId' AND UserId = '$userId' AND payment != 1" );

    if ($result->num_rows > 0) {

        $sql = "UPDATE productByUser SET payment = 1 WHERE idProduct = '$productId' AND UserId = '$userId' AND payment != 1 ";

        if ($conn->query($sql) === TRUE)
            echo 1;
        else
            echo 0;
    }
    else
        echo 0;

    mysql_close($conn);
endif;
