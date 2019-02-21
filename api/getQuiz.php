<?php 

	$qKey = $_POST["quizid"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
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