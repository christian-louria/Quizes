<?php 
	require '../vendor/autoload.php';

	$nick = $_POST["nick"];
	$url = $_POST["url"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}
	echo $nick;
	echo $url;

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);

	$updateXP = $conn->prepare('UPDATE users SET profilePic = ? WHERE nick = ?');
	$updateXP->bind_param("ss", $url, $nick);
	$updateXP->execute();
?>