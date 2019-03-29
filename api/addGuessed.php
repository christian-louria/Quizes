<?php 
	$nick = $_POST['nick'];
	$answer = $_POST['answer'];
	$question = $_POST['question'];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$addGuess = $conn->prepare('INSERT INTO answers(nick, answer, question_id) VALUES (?, ?, ?)');
	$addGuess->bind_param("sii", $nick, $answer, $question);
	$addGuess->execute();
	echo json_encode($count);
	
 ?>