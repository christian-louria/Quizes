<?php 

	$questKey = (int)$_POST["questkey"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getQuestion = $conn->prepare('DELETE FROM questions WHERE questKey = ?');
	$getQuestion->bind_param("i", $questKey);
	$getQuestion->execute();

 ?>