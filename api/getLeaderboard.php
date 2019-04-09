<?php 
	require '../vendor/autoload.php';
	

	$qKey = $_POST["quizid"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getBoard = $conn->prepare('SELECT * FROM leaderboard WHERE quizKey = ? ORDER BY score DESC');
	$getBoard->bind_param("i", $qKey);
	$getBoard->execute();
	$board = $getBoard->get_result();

	$boardList = [];

	while ($row = $board->fetch_assoc()) {
		
		array_push($boardList, $row);
	}

	echo json_encode($boardList);

?>