<?php 
	$nick = $_POST['nick'];
	$answer = $_POST['answer'];
	$question = $_POST['question'];
	$quizid = $_POST['quizid'];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$addGuess = $conn->prepare('INSERT INTO answers(nick, answer, question_id, quiz_id) VALUES (?, ?, ?, ?)');
	$addGuess->bind_param("siii", $nick, $answer, $question, $quizid);
	$addGuess->execute();
	echo json_encode($count);
	
 ?>