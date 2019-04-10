<?php 
	require '../vendor/autoload.php';

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getPlayers = $conn->prepare('SELECT * FROM users ORDER BY lastOn DESC LIMIT 6');
	$getPlayers->execute();
	$players = $getPlayers->get_result();

	$playerList = [];

	while ($row = $players->fetch_assoc()) {
		array_push($playerList, $row);
	}
	echo json_encode($playerList);
 ?>