<?php 
	$quizid = $_POST["quizid"];
	$nick = $_POST["nick"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getScore = $conn->prepare('SELECT score FROM leaderboard WHERE quizKey = ? AND nick = ?');
	$getScore->bind_param("is", $quizid, $nick );
	$getScore->execute();
	$score = $getScore->get_result()->fetch_assoc();

	echo json_encode($score);
 ?>