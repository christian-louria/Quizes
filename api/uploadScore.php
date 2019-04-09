<?php 
	require '../vendor/autoload.php';


	$nick = $_POST['taker'];
	$score = $_POST['score'];
	$quizKey = $_POST["quizKey"];
	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$addQuiz = $conn->prepare('INSERT INTO leaderboard(nick, score, quizKey) VALUES (?, ?, ?)' );

	$addQuiz->bind_param("sii", $nick, $score, $quizKey);
	$addQuiz->execute();

 ?>