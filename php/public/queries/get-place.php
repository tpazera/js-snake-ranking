<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["map"];
$points = $_GET["points"];
$query = "SELECT COUNT(id_rank) as 'place' FROM ranking WHERE points >= $points AND map_name = $mapName;";
$resultQuery = mysqli_query($db, $query);
$result = array();
 
while ($row = mysqli_fetch_row($resultQuery)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>