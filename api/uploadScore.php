<?php 

	$nick = $_POST['taker'];
	$score = $_POST['score'];
	$quizKey = $_POST["quizKey"];
	$conn = mysqli_connect('localhost', 'root', '***REMOVED***', 'quiz');
	$addQuiz = $conn->prepare('INSERT INTO leaderboard(nick, score, quizKey) VALUES (?, ?, ?)' );

	$addQuiz->bind_param("sii", $nick, $score, $quizKey);
	$addQuiz->execute();

 ?>