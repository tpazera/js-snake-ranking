<?php
 
header('Content-type: application/json');
require_once('connection.php');
 


$mapName = $_GET["mapName"];

$query = "SELECT ranking.user_name, ranking.points FROM ranking WHERE ranking.map_name = $mapName ORDER BY points DESC;";
$resultQuery = mysqli_query($db, $query);
$result = array();
 
while ($row = mysqli_fetch_row($resultQuery)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>