<?php 
	require '../vendor/autoload.php';
	
	
	$qKey = $_POST["quizid"];
	$nick = $_POST['nick'];
	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getQuestions = $conn->prepare('SELECT * FROM questions WHERE quizNum = ?');
	$getQuestions->bind_param("i", $qKey);
	$getQuestions->execute();
	$questions = $getQuestions->get_result();

	$questionList = [];

	while ($row = $questions->fetch_assoc()) {
		array_push($questionList, $row);
	}

	$getAnswers = $conn->prepare('SELECT * FROM answers WHERE quiz_id = ? AND nick = ?');
	$getAnswers->bind_param("is", $qKey, $nick);
	$getAnswers->execute();
	$answerInfo = $getAnswers->get_result();

	$answerList = [];

	while ($row = $answerInfo->fetch_assoc()) {
		array_push($answerList, $row);
	}

	$allInfo = [$answerList, $questionList];

	echo json_encode($allInfo);
 ?>