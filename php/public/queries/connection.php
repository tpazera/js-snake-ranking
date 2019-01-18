<?php

$server = 'mysql_snake';
$user = 'root';
$password = 'root';
$database = 'snake';

$db = mysqli_connect($server, $user, $password, $database);

if (mysqli_connect_errno()) 
{
    echo 'Error';
    exit;   
}
else {
}
 
?>