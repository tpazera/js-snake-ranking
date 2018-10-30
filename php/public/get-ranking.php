<?php
 
header('Content-type: application/json');
require_once('connection.php');
 


$mapName = $_GET["mapName"];

$queryGetRanking = "SELECT ranking.user_name, ranking.points FROM ranking WHERE ranking.map_name = $mapName";
$resultGetRanking = mysqli_query($db, $queryGetRanking);
/*Przygotowanie tablicy, która będzie przechowywać dane z bazy*/
$result = array();
 
while ($row = mysqli_fetch_row($resultGetRanking)) 
{
  $result[] = $row;
}
 
echo json_encode($result);
 
?>