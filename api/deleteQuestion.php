<?php 

	$questKey = (int)$_POST["questkey"];

	$conn = mysqli_connect('localhost', 'root', '***REMOVED***', 'quiz');
	$getQuestion = $conn->prepare('DELETE FROM questions WHERE questKey = ?');
	$getQuestion->bind_param("i", $questKey);
	$getQuestion->execute();

 ?>