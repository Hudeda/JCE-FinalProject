<?php

require "init.php";

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$password = $_POST['password'];

$pass = sha1($password);


$sql = "INSERT INTO users (First_Name, Last_Name, User_Name,Email,Phone,Password)
VALUES ('$firstName', '$lastName', '$userName','$userEmail','$userPhone','$pass')";


if ($conn->query($sql) === TRUE) {
    echo true;
} else {
    echo false;
}
