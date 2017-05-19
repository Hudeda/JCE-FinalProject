<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 29/03/2017
 * Time: 17:07
 */
session_start();
if (isset($_SESSION["userNameAdmin"])):
require "init.php";
$companyName = $_POST["companyName"];
$companyAddress = $_POST["companyAddress"];
$companyEmail = $_POST["companyEmail"];
$companyPhone = $_POST["companyPhone"];
$password = $_POST["password"];

$pass = sha1($password);
$sql = "INSERT INTO companyUser (companyName,companyAddress,companyPhone,companyEmail,companyPass)
VALUES ('$companyName','$companyAddress','$companyPhone','$companyEmail','$pass')";
$result =$conn->query($sql);
if ($result === TRUE) {
    @mail($companyEmail,'Buy With Friends',"Hello Seller, your Pssword is: ".$password);
    echo $result;
} else {
    echo "Error";
}
mysql_close($conn);
endif;

