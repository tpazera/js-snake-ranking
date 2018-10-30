<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["map"];
$queryGetWorstPosition = "SELECT MIN(points) as min FROM ranking WHERE map_name = $mapName";
$resultGetWorstPosition = mysqli_query($db, $queryGetWorstPosition);
$result = array();
 
while ($row = mysqli_fetch_row($resultGetWorstPosition)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>