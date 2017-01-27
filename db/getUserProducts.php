<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 26/11/2016
 * Time: 04:04
 */
require "init.php";

$userName = $_POST['userName'];

$result = $conn->query("SELECT * FROM productbwf JOIN (SELECT * FROM productByUser WHERE userName = '$userName') as pbu on productbwf.idProduct = pbu.idProduct ORDER BY productbwf.uploadDate DESC");

if ($result->num_rows > 0) {
    // output data of each row
    $product_Users = array();

    while ($row = $result->fetch_assoc()) {
        $resCell[0] = $row["idProduct"];
        $resCell[1] = $row["userName"];
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