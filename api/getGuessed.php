<?php 
	require '../vendor/autoload.php';
	
	$nick = $_POST['nick'];
	$question = $_POST['question'];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuestion = $conn->prepare('SELECT count(*) AS answer FROM answers WHERE nick = ? AND question_id = ?');
	$getQuestion->bind_param("si", $nick, $question);
	$getQuestion->execute();
	$count = $getQuestion->get_result()->fetch_assoc();

	if ($count['answer'] != 0) {
		$getGuess = $conn->prepare('SELECT answer FROM answers WHERE nick = ? AND question_id = ?');
		$getGuess->bind_param("si", $nick, $question);
		$getGuess->execute();
		$getGuess = $getGuess->get_result()->fetch_assoc();
		echo json_encode($getGuess);
		die();
	}

	echo json_encode($count);
?>