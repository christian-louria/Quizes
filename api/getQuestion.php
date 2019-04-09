<?php 
	require '../vendor/autoload.php';
	

	$questKey = (int)$_POST["questionid"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuestion = $conn->prepare('SELECT * FROM questions WHERE questKey = ?');
	$getQuestion->bind_param("i", $questKey);
	$getQuestion->execute();
	$question = $getQuestion->get_result();

	$questionList = [];

	while ($row = $question->fetch_assoc()) {
		
		array_push($questionList, $row);
	}

	echo json_encode($questionList);


 ?>