<?php
//this script connect to database
$servername = 'server77.hosting24.com';
$username = "buywithf_DB";
$password = "nati0109";
$dbname = "buywithf_DB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection

mysqli_set_charset($conn, "utf8");
if (!$conn) {
//    echo "<h3>not connection</h3>";
}
else
//echo "<h3>connected</h3>";


?> 