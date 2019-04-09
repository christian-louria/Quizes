<?php 
	require '../vendor/autoload.php';


	$username = $_POST["makeUser"];
	$nick = $_POST["makeNick"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
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