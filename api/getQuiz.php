<?php 
	require '../vendor/autoload.php';


	$qKey = $_POST["quizid"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuiz = $conn->prepare('SELECT * FROM quizes WHERE qKey = ?');
	$getQuiz->bind_param("i", $qKey);
	$getQuiz->execute();
	$quizInfo = $getQuiz->get_result();

	$quizList = [];

	while ($row = $quizInfo->fetch_assoc()) {
		
		array_push($quizList, $row);
	}

	echo json_encode($quizList);
 ?>