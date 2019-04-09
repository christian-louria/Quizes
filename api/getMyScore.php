<?php 
	require '../vendor/autoload.php';
	
	$quizid = $_POST["quizid"];
	$nick = $_POST["nick"];

	
	$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
	$dotenv->load();

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getScore = $conn->prepare('SELECT score FROM leaderboard WHERE quizKey = ? AND nick = ?');
	$getScore->bind_param("is", $quizid, $nick );
	$getScore->execute();
	$score = $getScore->get_result()->fetch_assoc();

	echo json_encode($score);
 ?>