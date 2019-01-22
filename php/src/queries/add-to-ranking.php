<?php
 
require_once('connection.php');
 
function filter($variable) 
{
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
 
$query = "INSERT INTO ranking (user_name, points, map_name) VALUES ($userNameFiltered, $pointsFiltered, $mapNameFiltered)";


$resultAdd = mysqli_query($db, $query);

echo $resultAdd;

?>