<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 14/04/2017
 * Time: 15:53
 */
session_start();
require "init.php";
if ($_SESSION["userIdSeller"] == $_POST['companyId']):

    $textSearch = $_POST["textSearch"];

    $date = date('Y-m-d H:i:s');
    $result = $conn->query("SELECT * FROM productBWF WHERE ((category LIKE '%$textSearch%') OR (productName LIKE '%$textSearch%') OR 
(companyName LIKE '%$textSearch%') OR (descriptionProduct LIKE '%$textSearch%')) AND endOfAddPeopleDate <  '$date' AND endOfGetOfferDate >  '$date'");

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
