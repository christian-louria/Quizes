<?php 
	$newBio = $_POST['newBio'];
	$nick = $_POST['nick'];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$updateBio = $conn->prepare('UPDATE users SET bio = ? WHERE nick = ?');
	$updateBio->bind_param("ss", $newBio, $nick);
	$updateBio->execute();
 ?>