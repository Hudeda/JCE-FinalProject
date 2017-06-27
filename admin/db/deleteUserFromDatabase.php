<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 14:40
 */
//delete user from database
session_start();
//check if the admin connected
if (isset($_SESSION["userNameAdmin"])):

    require "init.php";
    //get data from html
    $userId = $_POST["userId"];

    $sql = "DELETE FROM users WHERE UserId = '$userId'";
    //if success delete and if the user joined to group update -1
    if ($conn->query($sql)) {
        $sql = "UPDATE productBWF 
            SET NumberOfJoined = NumberOfJoined - 1 
            WHERE ProductId IN 
              (SELECT idProduct
              FROM productByUser 
              WHERE productByUser.UserId = '$userId')";
        if ($conn->query($sql)) {
            $sql = "DELETE FROM productByUser WHERE UserId = '$userId'";
            if ($conn->query($sql)) {
                echo 1;
            }else {
                echo 0;
            }
        } else
            echo 0;
    } else
        echo 0;
    mysql_close($conn);
endif;
