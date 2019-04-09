<?php 
	require '../vendor/autoload.php';
	
	$username = $_POST["username"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getUser = $conn->prepare('SELECT * FROM users WHERE username = ?');
	$getUser->bind_param("s", $username);
	$getUser->execute();
	$userinfo = $getUser->get_result();

	$userInfoList = [];

	if ($userinfo->num_rows > 0) {
		while ($row = $userinfo->fetch_assoc()) {
			
			array_push($userInfoList, $row);
		}

		$updateTime = $conn->prepare('UPDATE users SET users.lastOn = CURRENT_TIMESTAMP WHERE username = ?');
		$updateTime->bind_param("s", $username);
		$updateTime->execute();

		echo json_encode($userInfoList);
	}
	else {
		echo json_encode(false);
	}
 ?>