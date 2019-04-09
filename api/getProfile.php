<?php 
	require '../vendor/autoload.php';
	
	$nick = $_POST["nick"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
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