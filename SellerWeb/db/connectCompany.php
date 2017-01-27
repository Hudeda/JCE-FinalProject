<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 23/12/2016
 * Time: 11:43
 */

require "init.php";

$id = $_POST['id'];
$password = $_POST['password'];

$pass = sha1($password);

$result =  $conn->query( "SELECT * FROM companyUser WHERE ID = $id AND companyPass = '$pass'" );

if ($result->num_rows > 0) {
    // output data of each row

    $row = $result->fetch_assoc();
    $resCell[0] = $row["ID"];
    $resCell[1] = $row["companyName"];
    $resCell[2] = $row["companyAddress"];
    $resCell[3] = $row["companyPhone"];
    $resCell[4] = $row["companyEmail"];

    echo json_encode($resCell);

} else {
    echo "Error";
}
