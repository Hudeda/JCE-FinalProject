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
$result =  $conn->query( "SELECT * FROM users" );

if ($result->num_rows > 0) {
    // output data of each row
    $Users = array();

    while ($row = $result->fetch_assoc()) {
        $resCell[0] = $row["UserId"];
        $resCell[1] = $row["First_Name"];
        $resCell[2] = $row["Last_Name"];
        $resCell[3] = $row["User_Name"];
        $resCell[4] = $row["Email"];
        $resCell[5] = $row["Phone"];
        array_push($Users, $resCell);
    }
}
echo json_encode($Users);
mysql_close($conn);
endif;

