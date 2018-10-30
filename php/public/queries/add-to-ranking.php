<?php
 
require_once('connection.php');
 
function filter($variable) 
{
  $variable = substr($variable, 0, 9); // Ograniczenie ciągu do pierwszych 10 znaków
  $variable = trim($variable);
  $variable = stripslashes($variable);
  $variable = htmlspecialchars($variable); 
  return $variable; 
}
 
$mapName=$_POST['map'];
$userName=$_POST['user'];
$points=$_POST['points'];
 
$mapNameFiltered=filter($mapName);
$userNameFiltered=filter($userName);
$pointsFiltered=filter($points);
 
$queryAddToRanking = "INSERT INTO ranking (user_name, points, map_name) VALUES ('$userNameFiltered', $pointsFiltered, '$mapNameFiltered')";

$resultAdd = mysqli_query($db, $queryAddToRanking);

?>