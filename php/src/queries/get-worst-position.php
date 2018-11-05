<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["map"];
$query = "SELECT MIN(points) as min FROM ranking WHERE map_name = $mapName";
$resultQuery = mysqli_query($db, $query);
$result = array();
 
while ($row = mysqli_fetch_row($resultQuery)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>