<?php 

	$questKey = (int)$_POST["questionid"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
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