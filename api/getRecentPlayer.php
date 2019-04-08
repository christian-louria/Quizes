<?php 
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getPlayers = $conn->prepare('SELECT * FROM users ORDER BY lastOn DESC LIMIT 3');
	$getPlayers->execute();
	$players = $getPlayers->get_result();

	$playerList = [];

	while ($row = $players->fetch_assoc()) {
		array_push($playerList, $row);
	}
	echo json_encode($playerList);
 ?>