<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 09/04/2017
 * Time: 16:33
 */
session_start();
if (isset($_SESSION["userIdSeller"])):
    session_start();
    session_destroy();
    header("Location: ../index.php");
endif;