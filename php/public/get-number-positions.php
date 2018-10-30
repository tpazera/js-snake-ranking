<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["map"];

$queryGetNumberOfPositions = "SELECT COUNT(id_rank) FROM ranking WHERE ranking.map_name = $mapName";
$resultGetNumberOfPositions = mysqli_query($db, $queryGetNumberOfPositions);
$result = array();
 
while ($row = mysqli_fetch_row($resultGetNumberOfPositions)) 
{
  $result[] = $row;
}

echo json_encode($result);

 
?>