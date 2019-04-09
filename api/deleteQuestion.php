<?php 
	require '../vendor/autoload.php';


	$questKey = (int)$_POST["questkey"];


    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuestion = $conn->prepare('DELETE FROM questions WHERE questKey = ?');
	$getQuestion->bind_param("i", $questKey);
	$getQuestion->execute();

 ?>