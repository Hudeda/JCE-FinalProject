<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 25/11/2016
 * Time: 16:02
 */

require "init.php";

$idProduct = $_POST['idProduct'];

$result =  $conn->query( "SELECT COUNT(*) as count FROM productByUser WHERE idProduct = '$idProduct'");
$row = $result->fetch_assoc();
$count = $row['count'];
echo $count;