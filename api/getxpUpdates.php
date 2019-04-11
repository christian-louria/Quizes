<?php 
	require '../vendor/autoload.php';

	$nick = $_POST["nick"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$isLegit = $conn->prepare('SELECT count(*) FROM creatorxp WHERE creator = ? limit 1');
	$isLegit->bind_param("s", $nick);
	$isLegit->execute();
	$legit = $isLegit->get_result();

	echo json_encode($legit->fetch_assoc());

 ?>