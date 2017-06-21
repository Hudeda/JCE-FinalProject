<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 02/04/2017
 * Time: 17:21
 */

//this script send message to admin

require "init.php";

$userName = $_POST['userName'];
$message = $_POST['message'];
$title = $_POST['title'];

$uploadDate = date("Y-m-d H:i:s", strtotime('+7 hours'));
session_start();
if ($_SESSION["userNameBuyer"] == $_POST["userName"]):
    $type = "buyer";
else:
    $type = "else";
endif;

$sql = "INSERT INTO referencesUsers (userName,title,message,uploadDate,userType)
VALUES ('$userName' ,'$title','$message','$uploadDate','$type')";

if ($conn->query($sql) === TRUE) {
    echo true;
} else {
    echo false;
}
mysql_close($conn);