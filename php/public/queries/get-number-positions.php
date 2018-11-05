<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["map"];

$query = "SELECT COUNT(id_rank) FROM ranking WHERE ranking.map_name = $mapName";
$resultQuery = mysqli_query($db, $query);
$result = array();
 
while ($row = mysqli_fetch_row($resultQuery)) 
{
  $result[] = $row;
}

echo json_encode($result);

 
?>