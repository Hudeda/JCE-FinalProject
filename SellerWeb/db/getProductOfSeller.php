<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 18/01/2017
 * Time: 17:43
 */
session_start();
$companyId = $_POST["companyId"];

if ($_SESSION["userIdSeller"] == $companyId):
    require "init.php";

    $result = $conn->query("SELECT * FROM productBWF JOIN (SELECT * FROM sellerToProduct WHERE companyId = $companyId) as pbu on productBWF.ProductId = pbu.productId ORDER BY productBWF.uploadDate DESC");

    if ($result->num_rows > 0) {
        // output data of each row
        $product_Users = array();

        while ($row = $result->fetch_assoc()) {
            $resCell[0] = $row["ProductId"];
            $resCell[1] = $row["UserId"];
            $resCell[2] = $row["productName"];
            $resCell[3] = $row["companyName"];
            $resCell[4] = $row["descriptionProduct"];
            $resCell[5] = $row["category"];
            $resCell[6] = $row["endOfAddPeopleDate"];
            $resCell[7] = $row["endOfGetOfferDate"];
            $resCell[8] = $row["image"];
            $resCell[9] = $row["uploadDate"];
            $resCell[10] = $row["NumberOfJoined"];
            $resCell[11] = $row["Price"];
            array_push($product_Users, $resCell);
        }
    }
    echo json_encode($product_Users);
    mysql_close($conn);
endif;
