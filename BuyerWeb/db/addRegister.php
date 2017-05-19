<?php
session_start();

require "init.php";

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$password = $_POST['password'];
$UserId = uniqid();
$pass = sha1($password);

$result = $conn->query("SELECT * FROM users WHERE UserId =  '$UserId' OR User_Name = '$userName'OR Email = '$userEmail' OR Phone = '$userPhone'");

if ($result->num_rows > 0) {
    echo 0;
} else {
    $sql = "INSERT INTO users (UserId,First_Name, Last_Name, User_Name,Email,Phone,Password)
VALUES ('$UserId','$firstName', '$lastName', '$userName','$userEmail','$userPhone','$pass')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION["userNameBuyer"] = $_POST["userName"];
        echo $UserId;
    } else {
        echo 0;
    }
}

