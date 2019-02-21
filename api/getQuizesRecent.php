<?php 
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getQuizes = $conn->prepare('SELECT * FROM quizes ORDER BY qKey DESC LIMIT 7');
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