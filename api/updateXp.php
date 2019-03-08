<?php 
	$nick = $_POST["nick"];
	$XP = $_POST["XP"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateXP = $conn->prepare('UPDATE users SET xp = xp + ? WHERE nick = ?');
	$updateXP->bind_param("is", $XP, $nick);
	$updateXP->execute();
 ?>