<?php 

	$qKey = $_POST["quizid"];

	$conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');
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