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
$image_name = $userName . Date('Y-m-dH:i:s');

$uploadDate = date("Y-m-d H:i:s",strtotime('+7 hours'));
$int = (int) preg_replace('/\D/', '', $numberOfAddPeople) + preg_replace('/\D/', '', $numberForGetOffer);

$numberForGetOffer =Date('Y-m-d H:i:s', strtotime("+".$int." weeks"));
$numberOfAddPeople =Date('Y-m-d H:i:s', strtotime("+".$numberOfAddPeople." weeks"));

$filteredData = explode(',', $image);
$decoded_string = base64_decode($filteredData[1]);


$path = '../image/'.$image_name;
$file = fopen($path,'w');
$is_writting =fwrite($file,$decoded_string);
fclose($file);
$path = 'http://hudeda.netau.net/BuyWithFriendsWeb/image/'.$image_name;

if($is_writting > 0) {
    $sql = "INSERT INTO productbwf (userName, productName, companyName,descriptionProduct,category,numberOfAddPeople,numberForGetOffer,image,uploadDate)
VALUES ('$userName', '$productName', '$companyName','$descriptionProduct','$category','$numberOfAddPeople','$numberForGetOffer','$path', '$uploadDate')";


    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "INSERT INTO productByUser (idProduct,userName)VALUES ('$last_id','$userName')";
        $conn->query($sql);
        echo true;
    } else {
        echo false;
    }
}