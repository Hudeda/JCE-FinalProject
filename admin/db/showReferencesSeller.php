<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 03/04/2017
 * Time: 04:10
 */

// get add the message from seller users from database

session_start();
if (isset($_SESSION["userNameAdmin"])):
require "init.php";
$result =  $conn->query( "SELECT * FROM referencesUsers WHERE userType = 'seller' ORDER BY uploadDate ASC;" );

if ($result->num_rows > 0) {
    // output data of each row
    $messages = array();

    while ($row = $result->fetch_assoc()) {
        $resCell[0] = $row["userName"];
        $resCell[1] = $row["title"];
        $resCell[2] = $row["uploadDate"];
        $resCell[3] = $row["message"];
        array_push($messages, $resCell);
    }
    echo json_encode($messages);
}
else
    echo 'Error';
mysql_close($conn);
endif;
