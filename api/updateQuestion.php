<?php 
	$question = $_POST['question'];
	$q1 = $_POST['q1'];
	$q2 = $_POST['q2'];
	$q3 = $_POST['q3'];
	$q4 = $_POST['q4'];
	$answer = (int)$_POST['answer'];
	$questKey = $_POST["questkey"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateQuestion = $conn->prepare('UPDATE questions SET question = ?, q1 = ?, q2 = ?, q3 = ?, q4 = ?, answer = ? WHERE questKey = ?');
	$updateQuestion->bind_param("sssssii", $question, $q1, $q2, $q3, $q4, $answer, $questKey);
	$updateQuestion->execute();

 ?>