<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 14/11/2016
 * Time: 20:15
 */
session_start();
require "init.php";

$userName = $_POST['userName'];
$password = $_POST['password'];

if($password != '1')
    $pass = sha1($password);

$result =  $conn->query( "SELECT * FROM users WHERE User_Name = '$userName' AND Password = '$pass'" );

if ($result->num_rows > 0) {
    // output data of each row

    $row = $result->fetch_assoc();
    $resCell[0] = $row["First_Name"];
    $resCell[1] = $row["Last_Name"];
    $resCell[2] = $row["User_Name"];
    $resCell[3] = $row["Phone"];
    $resCell[4] = $row["Email"];
    $resCell[5] = $row["UserId"];
    $_SESSION["userNameBuyer"] = $_POST["userName"];
    echo json_encode($resCell);

} else {
    echo "Error";
}
mysql_close($conn);
