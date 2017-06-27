<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 17:07
 */

/*
this script add new seller to database
*/
session_start();
//check if admin as connected
if (isset($_SESSION["userNameAdmin"])):
require "init.php";

//get data from html
$companyName = $_POST["companyName"];
$companyAddress = $_POST["companyAddress"];
$companyEmail = $_POST["companyEmail"];
$companyPhone = $_POST["companyPhone"];
$password = $_POST["password"];

//hash on password to save on database
$pass = sha1($password);

// inset the seller
$sql = "INSERT INTO companyUser (companyName,companyAddress,companyPhone,companyEmail,companyPass)
VALUES ('$companyName','$companyAddress','$companyPhone','$companyEmail','$pass')";
$result =$conn->query($sql);

//check if success
if ($result === TRUE) {
    // send email with password
    @mail($companyEmail,'Buy With Friends',"Hello Seller, your Pssword is: ".$password);
    echo $result;
} else {
    echo "Error";
}
mysql_close($conn);
endif;

