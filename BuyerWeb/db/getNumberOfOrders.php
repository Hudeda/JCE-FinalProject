<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 03/06/2017
 * Time: 16:22
 */
// get the number of orders
require "init.php";

$idProduct = $_POST['idProduct'];

$result = $conn->query("SELECT * FROM productByUser WHERE idProduct = '$idProduct' AND payment = 1");
$count = 0;
while ($row = $result->fetch_assoc()) {
    $count += 1;
}
echo $count;
