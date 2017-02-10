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
$endOfAddPeopleDate = $_POST['endOfAddPeopleDate'];
$endOfGetOfferDate = $_POST['endOfGetOfferDate'];
$image = $_POST['image'];
$category = $_POST['category'];
$userName = $_POST['userName'];
$image_name = $userName . Date('Y-m-dH:i:s');

$uploadDate = date("Y-m-d H:i:s",strtotime('+7 hours'));
$int = (int) preg_replace('/\D/', '', $endOfAddPeopleDate) + preg_replace('/\D/', '', $endOfGetOfferDate);

$endOfGetOfferDate =Date('Y-m-d H:i:s', strtotime("+".$int." weeks"));
$endOfAddPeopleDate =Date('Y-m-d H:i:s', strtotime("+".$endOfAddPeopleDate." weeks"));

$filteredData = explode(',', $image);
$decoded_string = base64_decode($filteredData[1]);

$pathOfDir = '../image/'.$userName;
if(!is_dir($pathOfDir)){
    mkdir($pathOfDir);
}
$path = '../image/'.$userName.'/'.$image_name;
$file = fopen($path,'w');
$is_writting =fwrite($file,$decoded_string);
fclose($file);
$path = 'http://buy-with-friends.com/BuyerWeb/image/'.$userName.'/'.$image_name;

if($is_writting > 0) {
    $sql = "INSERT INTO productbwf (userName, productName, companyName,descriptionProduct,category,endOfAddPeopleDate,endOfGetOfferDate,image,uploadDate)
VALUES ('$userName', '$productName', '$companyName','$descriptionProduct','$category','$endOfAddPeopleDate','$endOfGetOfferDate','$path', '$uploadDate')";


    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "INSERT INTO productByUser (idProduct,userName)VALUES ('$last_id','$userName')";
        $conn->query($sql);
        echo true;
    } else {
        echo false;
    }
}