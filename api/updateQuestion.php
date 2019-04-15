<?php 
	require '../vendor/autoload.php';

	$question = $_POST['question'];
	$q1 = $_POST['q1'];
	$q2 = $_POST['q2'];
	$q3 = $_POST['q3'];
	$q4 = $_POST['q4'];
	$answer = $_POST['answer'];

	$q1hint = empty($_POST['q1hint']) ? null : $_POST['q1hint'];
	$q2hint = empty($_POST['q2hint']) ? null : $_POST['q2hint'];
	$q3hint = empty($_POST['q3hint']) ? null : $_POST['q3hint'];
	$q4hint = empty($_POST['q4hint']) ? null : $_POST['q4hint'];

	echo $q1hint;

	$questKey = $_POST["questkey"];

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);
	$updateQuestion = $conn->prepare('UPDATE questions SET question = ?, q1 = ?, q2 = ?, q3 = ?, q4 = ?, answer = ?, q1help = ?, q2help = ?, q3help = ?, q4help = ? WHERE questKey = ?');
	$updateQuestion->bind_param("sssssissssi", $question, $q1, $q2, $q3, $q4, $answer, $q1hint, $q2hint, $q3hint, $q4hint, $questKey);
	$updateQuestion->execute();

 ?>