	
	<?php
	    if (!empty($_POST)) {
	      	define('DB_SERVER', '127.0.0.1:3306');
	      	define('DB_USERNAME', 'root');
	      	define('DB_PASSWORD', '');
	      	define('DB_DATABASE', 'j3safetysolutions');
	      	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

	      	$username = $_POST['username'];
	      	$password = $_POST['password'];

	      	$cost = 10;
	      	$salt = base64_encode('authentication');
	      	$salt = "$2a$%02d$".$cost.$salt;
	      	$hash = crypt($password, $salt);

	      	$sql = "select * from users as a where a.username = '$username' and a.password = '$hash' and a.status='ACTIVE'";
	      	$result = $conn->query($sql);

	      	if ($result->num_rows > 0) {
	        	while($row = $result->fetch_assoc()) {
	        		$ip = '';
					if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
						$ip = $_SERVER['HTTP_CLIENT_IP'];
					} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
						$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
					} else {
						$ip = $_SERVER['REMOTE_ADDR'];
					}
					/* Creating a custom authentication, save the data to a text file
					* Instead of cookies, I use text file
					*/
					date_default_timezone_set('Asia/Manila');
					//create a file name as the username
					$file = '../21232f297a57a5a743894a0e4a801fc3/'.$username.'.txt';
					$handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
					//the data to be stored in the text file; format: uid;IP;date/time
					$data = $row['uid'].';'.$ip.';'.date('Y-m-d H:i:s', time());
					if (!file_exists($file) || !fwrite($handle, $data)){
						 echo 'Unable to write the file';
						 die();
					}
					fclose($handle);
			

	          		setcookie('error', null, time() + (10), "/");

	          		echo "<script type='text/javascript'>";
	          		echo "var temp = document.cookie.split(';');";
              		echo "var url = '';";
              		echo "if (temp != null) {";
                	echo "		for (var i = 0; i < temp.length; i++) {";
                  	echo "		if (temp[i].indexOf('previous_url') > -1) {";
                    echo "			url = temp[i].split('=');";
                  	echo "			document.cookie='username=".$row['username']."; path=/';";
		      		echo "			document.cookie='uid=".$row['uid']."; path=/';";
                    echo "			var previous_url = '../home#' + url[1];";
                    echo "			window.location = previous_url;";
                  	echo "		}";
                  	echo "		else {";
                   	echo "			document.cookie='username=".$row['username']."; path=/';";
		      		echo "			document.cookie='uid=".$row['uid']."; path=/';";
                    echo "			window.location = '../home'";
                  	echo "		}";
                	echo "	}";
              		echo "}";
              		echo "console.log(document.cookie);";
              		echo "</script>";
	        	}
	      	}
	      	else {
	      		setcookie('error', 'Invalid username or password.', time() + (86400), "/");
	      		header('location: ../index.php');
	      	}
	    }
  ?>