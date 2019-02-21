<?php 

	$nick = $_POST['taker'];
	$score = $_POST['score'];
	$quizKey = $_POST["quizKey"];
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$addQuiz = $conn->prepare('INSERT INTO leaderboard(nick, score, quizKey) VALUES (?, ?, ?)' );

	$addQuiz->bind_param("sii", $nick, $score, $quizKey);
	$addQuiz->execute();

 ?>