<?php 
	require '../vendor/autoload.php';
	
	
	$quizNum = $_POST["quizid"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuestions = $conn->prepare('SELECT * FROM questions WHERE quizNum = ?');
	$getQuestions->bind_param("i", $quizNum);
	$getQuestions->execute();
	$questions = $getQuestions->get_result();

	$questionList = [];

	while ($row = $questions->fetch_assoc()) {
		
		array_push($questionList, $row);
	}

	echo json_encode($questionList);

 ?>