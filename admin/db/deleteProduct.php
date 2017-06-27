<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 15/04/2017
 * Time: 20:58
 */
// this script delete product form database
session_start();
//check if admin connected
if (isset($_SESSION["userNameAdmin"])):
    require "init.php";
    //get data
    $productId = $_POST['productId'];

    $sql = "DELETE FROM productBWF WHERE ProductId = '$productId'";
    //check if exist product
    if($conn->query($sql)) {
        //delete product
        $sql = "DELETE FROM productByUser WHERE idProduct = '$productId'";
        if ($conn->query($sql))
            echo 1;
        else
            echo 0;
    }
    else
        echo 0;
    
    mysql_close($conn);
endif;

