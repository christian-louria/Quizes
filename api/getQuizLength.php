<?php 
	require '../vendor/autoload.php';
	
	$quizNum = $_POST["quizid"];
	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuiz = $conn->prepare('SELECT COUNT(*) FROM questions WHERE quizNum = ?');
	$getQuiz->bind_param("i", $quizNum);
	$getQuiz->execute();
	$getQuiz = $getQuiz->get_result();
	$count = $getQuiz->fetch_assoc();

	echo json_encode($count);

 ?>