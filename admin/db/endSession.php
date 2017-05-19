<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 09/04/2017
 * Time: 11:47
 */
session_start();
if (isset($_SESSION["userNameAdmin"])):
session_start();
session_destroy();
header("Location: ../index.php");
endif;