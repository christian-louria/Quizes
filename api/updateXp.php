<?php 
	require '../vendor/autoload.php';

	$nick = $_POST["nick"];
	$XP = $_POST["XP"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateXP = $conn->prepare('UPDATE users SET xp = xp + ? WHERE nick = ?');
	$updateXP->bind_param("is", $XP, $nick);
	$updateXP->execute();
 ?>