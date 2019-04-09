<?php 
	require '../vendor/autoload.php';

	$newBio = $_POST['newBio'];
	$nick = $_POST['nick'];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateBio = $conn->prepare('UPDATE users SET bio = ? WHERE nick = ?');
	$updateBio->bind_param("ss", $newBio, $nick);
	$updateBio->execute();
 ?>