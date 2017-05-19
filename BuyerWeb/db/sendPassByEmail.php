<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 17/11/2016
 * Time: 18:01
 */


$email = $_POST['email'];
$password = $_POST['password'];

@mail($email,'Buy With Friends',"Yournew Pssword is: ".$password);


$pass = sha1($password);

require "init.php";

$sql = "UPDATE users SET Password = '$pass' WHERE Email='$email'";


if ($conn->query($sql) === TRUE) {
    echo true;
} else {
    echo false;
}
mysql_close($conn);
