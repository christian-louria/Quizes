<?php 
	$nick = $_POST['nick'];
	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateInfo = $conn->prepare('UPDATE users SET streak = 0, wrongAnswers = wrongAnswers + 1 WHERE nick = ?' );

	$updateInfo->bind_param("s", $nick);
	$updateInfo->execute();

 ?>