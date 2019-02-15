<?php 

	$username = $_POST["makeUser"];
	$nick = $_POST["makeNick"];

	$conn = mysqli_connect('localhost', 'root', '***REMOVED***', 'quiz');
	$insertUser = $conn->prepare("INSERT INTO users(nick, username) VALUES (?,?)");
	$insertUser->bind_param("ss", $nick, $username);
	$insertUser->execute();

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