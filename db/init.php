<?php
$servername = 'mysql7.000webhost.com';
$username = "a5581880_BWF";
$password = "adam0109";
$dbname = "a5581880_BWFDB";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);
// Check connection

mysqli_set_charset($conn,"utf8");
if (!$conn) {
//    echo "<h3>not connection</h3>";
}
else
//echo "<h3>connected</h3>";


?> 