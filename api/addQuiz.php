<?php 

	$quizName = $_POST['quizName'];
	$quizCreator = $_POST['quizCreator'];
	$conn = mysqli_connect('localhost', 'root', '***REMOVED***', 'quiz');
	$addQuiz = $conn->prepare('INSERT INTO quizes(quizName, quizCreator) VALUES (?, ?)' );

	$addQuiz->bind_param("ss", $quizName, $quizCreator);
	$addQuiz->execute();


	$getQuiz = $conn->prepare('SELECT * FROM quiz.quizes WHERE quizName = ? LIMIT 1');
	$getQuiz->bind_param('s', $quizName);
	$getQuiz->execute();
	$quizInfo = $getQuiz->get_result();

	$quizList = [];

	while ($row = $quizInfo->fetch_assoc()) {
		
		array_push($quizList, $row);
	}

	echo json_encode($quizList);

 ?>