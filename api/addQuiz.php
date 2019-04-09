<?php 
require '../vendor/autoload.php';
	
	$quizName = $_POST['quizName'];
	$quizCreator = $_POST['quizCreator'];
	

	if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$addQuiz = $conn->prepare('INSERT INTO quizes(quizName, quizCreator) VALUES (?, ?)' );

	$addQuiz->bind_param("ss", $quizName, $quizCreator);
	$addQuiz->execute();


	$getQuiz = $conn->prepare('SELECT * FROM quizes WHERE quizName = ? LIMIT 1');
	$getQuiz->bind_param('s', $quizName);
	$getQuiz->execute();
	$quizInfo = $getQuiz->get_result();

	$quizList = [];

	while ($row = $quizInfo->fetch_assoc()) {
		
		array_push($quizList, $row);
	}

	echo json_encode($quizList);

 ?>