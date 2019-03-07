<?php
    $nick = $_POST['nick'];

    $target_dir = "../uploads/profilePics/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]['name']);
	$uploadOk = 1;
	$albumFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    $conn = mysqli_connect('***REMOVED***', '***REMOVED***', '***REMOVED***', '***REMOVED***');


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