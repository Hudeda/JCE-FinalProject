<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 27/03/2017
 * Time: 18:54

 */
/*
check connection of seller
*/
session_start();

require "init.php";
//data from html
$userName = $_POST['userName'];
$pass = $_POST['pass'];

$pass = sha1($pass);
$result =  $conn->query( "SELECT userName FROM adminUser WHERE userName = '$userName' AND password = '$pass'" );

//check if have exist user
if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    $resCell[0] = $row["userName"];
    //open session for this user
    $_SESSION["userNameAdmin"] = $_POST["userName"];

    echo json_encode($resCell);
    mysql_close($conn);
} else {
    echo "Error";
}
?>

