<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 21/11/2016
 * Time: 11:28
 */
require "init.php";

$catagory = $_POST['catagory'];


$result = $conn->query("SELECT * FROM productbwf WHERE category = '$catagory'");

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
        $resCell[6] = $row["numberOfAddPeople"];
        $resCell[7] = $row["numberForGetOffer"];
        $resCell[8] = $row["image"];
        $resCell[9] = $row["uploadDate"];
        array_push($product_Users, $resCell);
    }

}
echo json_encode($product_Users);

