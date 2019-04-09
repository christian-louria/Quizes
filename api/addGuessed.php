<?php 
	require '../vendor/autoload.php';

	$nick = $_POST['nick'];
	$answer = $_POST['answer'];
	$question = $_POST['question'];
	$quizid = $_POST['quizid'];

	if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$addGuess = $conn->prepare('INSERT INTO answers(nick, answer, question_id, quiz_id) VALUES (?, ?, ?, ?)');
	$addGuess->bind_param("siii", $nick, $answer, $question, $quizid);
	$addGuess->execute();
	echo json_encode($count);
	
 ?>