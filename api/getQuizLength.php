<?php 
	$quizNum = $_POST["quizid"];
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getQuiz = $conn->prepare('SELECT COUNT(*) FROM questions WHERE quizNum = ?');
	$getQuiz->bind_param("i", $quizNum);
	$getQuiz->execute();
	$getQuiz = $getQuiz->get_result();
	$count = $getQuiz->fetch_assoc();

	echo json_encode($count);

 ?>