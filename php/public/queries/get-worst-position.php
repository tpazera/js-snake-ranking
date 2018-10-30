<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["mapName"];

$queryGetWorstPosition = "SELECT MIN(points) FROM ranking WHERE ranking.map_name = $mapName";
$resultGetWorstPosition = mysqli_query($db, $queryGetNumberOfPositions);
/*Przygotowanie tablicy, która będzie przechowywać dane z bazy*/
$result = array();
 
while ($row = mysqli_fetch_row($resultGetWorstPosition)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>