
<?php 
	$nick = $_POST["nick"];
	$quizKey = $_POST['quizid'];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$isLegit = $conn->prepare('SELECT count(*) FROM leaderboard WHERE nick = ? AND quizKey = ? limit 1');
	$isLegit->bind_param("si", $nick, $quizKey);
	$isLegit->execute();
	$legit = $isLegit->get_result();

	echo json_encode($legit->fetch_assoc());

 ?>