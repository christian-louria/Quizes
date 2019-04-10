<?php 
	require '../vendor/autoload.php';

	$nick = $_POST['nick'];
	$comment = $_POST['comment'];
	$quizid = $_POST['quizid'];

	if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);


	$addGuess = $conn->prepare('INSERT INTO comments(nick, quizid, comment) VALUES (?, ?, ?)');
	$addGuess->bind_param("sis", $nick, $quizid, $comment);
	$addGuess->execute();
	
 ?>