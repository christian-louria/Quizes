<?php
    require '../vendor/autoload.php';

    $nick = $_POST['nick'];

    $target_dir = "../uploads/profilePics/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]['name']);
	$uploadOk = 1;
	$albumFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    if (file_exists(__DIR__ . '/../.env')) {
		$dotenv = Dotenv\Dotenv::create(__DIR__ . '/..');
		$dotenv->load();
	}

	$conn = mysqli_connect($_ENV["DB_SERVER"], $_ENV["DB_USERNAME"], $_ENV["DB_PASSWORD"], $_ENV["DB_DATABASE"]);


	// Check if file already exists
    if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file)) {
    	$stmt2 = $conn->prepare('UPDATE users SET profilePic = ? WHERE nick = ?');
    	$stmt2->bind_param("ss", $target_file, $nick);
		$stmt2->execute();
        echo "Uploading";
    }
    else {
        echo "Sorry, there was an error uploading your file.";
    }
?>