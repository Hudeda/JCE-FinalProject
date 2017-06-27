<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 17:32
 */

//this script delete seller from database
session_start();
//check if admin connected
if (isset($_SESSION["userNameAdmin"])):
    require "init.php";
    //get data
    $idSeller = $_POST['idSeller'];
    // delete user from database
    $sql = "DELETE FROM companyUser WHERE ID = '$idSeller'";
    //if success update all product price that selle is the provider to 0 and delete the connection between them
    if ($conn->query($sql)) {
        $sql = "UPDATE productBWF 
            SET Price = 0 
            WHERE ProductId IN 
              (SELECT productId
              FROM sellerToProduct 
              WHERE companyId = '$idSeller')";
        if ($conn->query($sql)) {
            $sql = "DELETE FROM sellerToProduct WHERE companyId = '$idSeller'";
            if ($conn->query($sql)) {
                echo 1;
            } else {
                echo 0;
            }
        } else
            echo 0;
    } else
        echo 0;

    mysql_close($conn);
endif;

