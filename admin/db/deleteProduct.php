<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 15/04/2017
 * Time: 20:58
 */
session_start();
if (isset($_SESSION["userNameAdmin"])):
    require "init.php";

    $productId = $_POST['productId'];

    $sql = "DELETE FROM productBWF WHERE ProductId = '$productId'";

    if($conn->query($sql)) {
        $sql = "DELETE FROM productByUser WHERE idProduct = '$productId'";
        if ($conn->query($sql))
            echo 1;
        else
            echo 1;
    }
    else
        echo 0;
    
    mysql_close($conn);
endif;

