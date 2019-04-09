<?php 
	require '../vendor/autoload.php';

	$quizNum = $_POST["quizNum"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateQuestion = $conn->prepare('UPDATE quizes SET released = 0 WHERE qKey = ?');
	$updateQuestion->bind_param("i", $quizNum);
	$updateQuestion->execute();

 ?>