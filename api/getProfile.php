<?php 
	$nick = $_POST["nick"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getUser = $conn->prepare('SELECT * FROM users WHERE nick = ?');
	$getUser->bind_param("s", $nick);
	$getUser->execute();
	$userinfo = $getUser->get_result();

	$userInfoList = [];

	while ($row = $userinfo->fetch_assoc()) {
		
		array_push($userInfoList, $row);
	}

	echo json_encode($userInfoList);

?>