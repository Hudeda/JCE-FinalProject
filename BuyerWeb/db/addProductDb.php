<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 16/11/2016
 * Time: 14:14
 */
//this script add new product group
session_start();
//check if buyer is registered
if (isset($_SESSION["userNameBuyer"])):
require "init.php";

//get data from html
$productName = $_POST['productName'];
$companyName = $_POST['companyName'];
$descriptionProduct = $_POST['descriptionProduct'];
$endOfAddPeopleDate = $_POST['endOfAddPeopleDate'];
$endOfGetOfferDate = $_POST['endOfGetOfferDate'];
$image = $_POST['image'];
$category = $_POST['category'];
$UserId = $_POST['UserIdBuyer'];
$image_name = $UserId . Date('Y-m-dH:i:s');

$uploadDate = date("Y-m-d H:i:s",strtotime('+7 hours'));
$int = (int) preg_replace('/\D/', '', $endOfAddPeopleDate) + preg_replace('/\D/', '', $endOfGetOfferDate);

$endOfGetOfferDate =Date('Y-m-d H:i:s', strtotime("+".$int." weeks"));
$endOfAddPeopleDate =Date('Y-m-d H:i:s', strtotime("+".$endOfAddPeopleDate." weeks"));

//create image decoded string
$filteredData = explode(',', $image);
$decoded_string = base64_decode($filteredData[1]);

//create folder by userId name
$pathOfDir = '../image/'.$UserId;
if(!is_dir($pathOfDir)){
    mkdir($pathOfDir);
}
//create the path of this folder
$path = '../image/'.$UserId.'/'.$image_name.'.jpg';
//open image file
$file = fopen($path,'w');
//write the image
$is_writting =fwrite($file,$decoded_string);
//close file
fclose($file);
$path = 'http://buy-with-friends.com/BuyerWeb/image/'.$UserId.'/'.$image_name.'.jpg';
//if success to write the image create the group
if($is_writting > 0) {
    $sql = "INSERT INTO productBWF (productName, companyName,descriptionProduct,category,endOfAddPeopleDate,endOfGetOfferDate,image,uploadDate,UserId)
VALUES ('$productName', '$companyName','$descriptionProduct','$category','$endOfAddPeopleDate','$endOfGetOfferDate','$path', '$uploadDate','$UserId')";


    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "INSERT INTO productByUser (idProduct,UserId)VALUES ('$last_id','$UserId')";
        $conn->query($sql);
        echo true;
    } else {
        echo false;
    }
}
mysql_close($conn);
endif;
