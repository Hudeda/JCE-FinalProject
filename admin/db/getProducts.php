<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 27/03/2017
 * Time: 20:24
 */
session_start();
if (isset($_SESSION["userNameAdmin"])):
require "init.php";
$result =  $conn->query( "SELECT * FROM productBWF" );

if ($result->num_rows > 0) {
    // output data of each row
    $Products = array();

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
        array_push($Products, $resCell);
    }
}
echo json_encode($Products);
mysql_close($conn);
endif;
