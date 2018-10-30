<?php
 
header('Content-type: application/json');
require_once('connection.php');
 
$mapName = $_GET["mapName"];

?> <script>console.log(<?php echo $mapName ?>)</script> <?php

$queryGetNumberOfPositions = "SELECT JSON_LENGTH(id_rank) FROM ranking WHERE ranking.map_name = $mapName";
?> <script>console.log(<?php echo $queryGetNumberOfPositions ?>)</script> <?php
$resultGetNumberOfPositions = mysqli_query($db, $queryGetNumberOfPositions);
/*Przygotowanie tablicy, która będzie przechowywać dane z bazy*/
$result = array();
 
while ($row = mysqli_fetch_row($resultGetNumberOfPositions)) 
{
  $result[] = $row;
}

echo json_encode($result);

 
?>