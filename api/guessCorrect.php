<?php 
	require '../vendor/autoload.php';

	$nick = $_POST['nick'];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateInfo = $conn->prepare('UPDATE users SET highestStreak = GREATEST(highestStreak, streak + 1), streak = streak + 1, correctAnswers = correctAnswers + 1 WHERE nick = ?' );

	$updateInfo->bind_param("s", $nick);
	$updateInfo->execute();

 ?>