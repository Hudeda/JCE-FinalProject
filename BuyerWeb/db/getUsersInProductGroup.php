<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 25/11/2016
 * Time: 16:02
 */
//this script return number of joined to product

require "init.php";

$idProduct = $_POST['idProduct'];

$result =  $conn->query( "SELECT COUNT(*) as count FROM productByUser WHERE idProduct = '$idProduct'");
$row = $result->fetch_assoc();
$count = $row['count'];
echo $count;
mysql_close($conn);

