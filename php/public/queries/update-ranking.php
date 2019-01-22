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
 
$query = "UPDATE ranking SET user_name=$userNameFiltered, points=$pointsFiltered WHERE id_rank=(SELECT id_rank FROM ranking WHERE points = (SELECT MIN(points) FROM ranking WHERE map_name = $mapNameFiltered) AND map_name = $mapNameFiltered LIMIT 1);";

$resultUpdate = mysqli_query($db, $query);

?>