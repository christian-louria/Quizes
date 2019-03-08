<?php 
	$nick = $_POST['nick'];
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateInfo = $conn->prepare('UPDATE users SET highestStreak = GREATEST(highestStreak, streak + 1), streak = streak + 1, correctAnswers = correctAnswers + 1 WHERE nick = ?' );

	$updateInfo->bind_param("s", $nick);
	$updateInfo->execute();

 ?>