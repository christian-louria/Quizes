<?php 
	require '../vendor/autoload.php';
	
	$nick = $_POST['nick'];
	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateInfo = $conn->prepare('UPDATE users SET streak = 0, wrongAnswers = wrongAnswers + 1 WHERE nick = ?' );

	$updateInfo->bind_param("s", $nick);
	$updateInfo->execute();

 ?>