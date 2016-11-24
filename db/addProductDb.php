<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 16/11/2016
 * Time: 14:14
 */

require "init.php";

$productName = $_POST['productName'];
$companyName = $_POST['companyName'];
$descriptionProduct = $_POST['descriptionProduct'];
$numberOfAddPeople = $_POST['numberOfAddPeople'];
$numberForGetOffer = $_POST['numberForGetOffer'];
$image = $_POST['image'];
$category = $_POST['category'];
$userName = $_POST['userName'];


$sql = "INSERT INTO productbwf (userName, productName, companyName,descriptionProduct,category,numberOfAddPeople,numberForGetOffer,image)
VALUES ('$userName', '$productName', '$companyName','$descriptionProduct','$category','$numberOfAddPeople','$numberForGetOffer','$image')";


if ($conn->query($sql) === TRUE) {
    echo  $image;
} else {
    echo false;
}