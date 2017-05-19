<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 15:11
 */
session_start();
if (isset($_SESSION["userNameAdmin"])):
require "init.php";
$result =  $conn->query( "SELECT * FROM companyUser" );

if ($result->num_rows > 0) {
    // output data of each row
    $Seller = array();

    while ($row = $result->fetch_assoc()) {
        $resCell[0] = $row["ID"];
        $resCell[1] = $row["companyName"];
        $resCell[2] = $row["companyAddress"];
        $resCell[3] = $row["companyEmail"];
        $resCell[4] = $row["companyPhone"];
        array_push($Seller, $resCell);
    }
}
echo json_encode($Seller);
mysql_close($conn);
endif;
