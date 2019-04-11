<?php 
	require '../vendor/autoload.php';

	$taker = $_POST["taker"];
	$creator = $_POST["creator"];
	$XP = $_POST["xp"];
	$quizName = $_POST["quizName"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);


	$updateXP = $conn->prepare('INSERT INTO creatorxp(taker, creator, xp, quizName) VALUES (?, ?, ?, ?)');
	$updateXP->bind_param("ssis", $taker, $creator, $XP, $quizName);
	$updateXP->execute();
?>