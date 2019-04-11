<?php 
	require '../vendor/autoload.php';

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$nick = $_POST['nick'];

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$getXP = $conn->prepare('SELECT * FROM creatorxp WHERE creator = ?');
	$getXP->bind_param("s", $nick);
	$getXP->execute();
	$test = $getXP->get_result();

	$xpList = [];

	$totalXP = 0;

	while ($row = $test->fetch_assoc()) {
		$totalXP += $row['xp'];
		array_push($xpList, $row);
	}
	
	$updateXP = $conn->prepare('UPDATE users SET xp = xp + ? WHERE nick = ?');
	$updateXP->bind_param("is", $totalXP, $nick);
	$updateXP->execute();


	echo json_encode($xpList);


	$removeXP =  $conn->prepare('DELETE FROM creatorxp WHERE creator = ?');
	$removeXP->bind_param("s", $nick);
	$removeXP->execute();



	
 ?>