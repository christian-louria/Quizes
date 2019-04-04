<?php 
	
	$quizNum = $_POST["quizid"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
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