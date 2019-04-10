<?php 
	require '../vendor/autoload.php';

	$quizid = $_POST["quizid"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);

	$getComments = $conn->prepare('SELECT * FROM comments WHERE quizid = ?');
	$getComments->bind_param("i", $quizid);
	$getComments->execute();
	$comments = $getComments->get_result();

	$commentList = [];

	while ($row = $comments->fetch_assoc()) {
		
		array_push($commentList, $row);
	}

	echo json_encode($commentList);
 ?>