<?php 
	require '../vendor/autoload.php';
	

	$quizCreator = $_POST['nick'];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuizes = $conn->prepare('SELECT * FROM quizes WHERE quizCreator = ?');
	$getQuizes->bind_param("s", $quizCreator);
	$getQuizes->execute();
	$quizes = $getQuizes->get_result();

	$quizList = [];

	while ($row = $quizes->fetch_assoc()) {
		$qKey = $row["qKey"];

		$getQuiz = $conn->prepare('SELECT COUNT(*) FROM questions WHERE quizNum = ?');
		$getQuiz->bind_param("i", $qKey);
		$getQuiz->execute();
		$getQuiz = $getQuiz->get_result();
		$count = $getQuiz->fetch_assoc();

		array_push($row, $count["COUNT(*)"]);

		array_push($quizList, $row);
	}

	echo json_encode($quizList);
 ?>