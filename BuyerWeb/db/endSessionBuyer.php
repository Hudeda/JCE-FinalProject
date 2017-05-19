<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 09/04/2017
 * Time: 12:38
 */
session_start();
if (isset($_SESSION["userNameBuyer"])):
session_start();
session_destroy();
header("Location: ../index.php");
endif;