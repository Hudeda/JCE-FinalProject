<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 21/04/2017
 * Time: 17:35
 */
session_start();

require "init.php";

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$UserId = $_POST['userId'];


$result = $conn->query("SELECT * FROM users WHERE UserId =  '$UserId' OR User_Name = '$userName'OR Email = '$userEmail'");

if ($result->num_rows > 0) {
    echo 0;
} else {
    $sql = "INSERT INTO users (UserId,First_Name, Last_Name, User_Name,Email,Phone)
VALUES ('$UserId','$firstName', '$lastName', '$userName','$userEmail','$userPhone')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION["userNameBuyer"] = $_POST["userName"];
        echo $UserId;
    } else {
        echo 0;
    }
}

