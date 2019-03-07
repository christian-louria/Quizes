<?php 
	$username = $_POST["username"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
	$getUser = $conn->prepare('SELECT * FROM users WHERE username = ?');
	$getUser->bind_param("s", $username);
	$getUser->execute();
	$userinfo = $getUser->get_result();

	$userInfoList = [];

	if ($userinfo->num_rows > 0) {
		while ($row = $userinfo->fetch_assoc()) {
			
			array_push($userInfoList, $row);
		}

		echo json_encode($userInfoList);
	}
	else {
		echo json_encode(false);
	}
 ?>