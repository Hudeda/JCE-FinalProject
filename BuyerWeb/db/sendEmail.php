<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 17/11/2016
 * Time: 18:01
 */


$email = $_POST['email'];
$password = $_POST['password'];

@mail($email,'Buy With Friends',"Your new Pssword is: ".$password);


$pass = sha1($password);

require "init.php";

$sql = "UPDATE Userrs SET Password = '$pass' WHERE Email='$email'";


if ($conn->query($sql) === TRUE) {
    echo true;
} else {
    echo false;
}



