<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 17:32
 */

session_start();
if (isset($_SESSION["userNameAdmin"])):
require "init.php";

$idSeller = $_POST['idSeller'];

$sql = "DELETE FROM companyUser WHERE ID = '$idSeller'";
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
            }else {
                echo 0;
            }
        } else
            echo 0;
    }
    else
        echo 0;

mysql_close($conn);
endif;

