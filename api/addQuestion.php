<?php 
	require '../vendor/autoload.php';

	$quizNum = (int)$_POST['quizNum'];
	$question = $_POST['question'];
	$q1 = $_POST['q1'];
	$q2 = $_POST['q2'];
	$q3 = $_POST['q3'];
	$q4 = $_POST['q4'];
	$answer = (int)$_POST['answer'];


	if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$addQuiz = $conn->prepare('INSERT INTO questions(question, q1, q2, q3, q4, answer, quizNum) VALUES (?, ?, ?, ?, ?, ?, ?)');

	$addQuiz->bind_param("sssssii", $question, $q1, $q2, $q3, $q4, $answer, $quizNum);
	$addQuiz->execute();
 ?>