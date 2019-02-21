<?php 
	$quizNum = $_POST["quizNum"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateQuestion = $conn->prepare('UPDATE quizes SET released = 0 WHERE qKey = ?');
	$updateQuestion->bind_param("i", $quizNum);
	$updateQuestion->execute();

 ?>