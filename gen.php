<?php
	//encrypting password
        $cost = 10;
        $salt = base64_encode('authentication');
        $salt = "$2a$%02d$".$cost.$salt;
        $hash = crypt('admin', $salt);
        echo $hash;
?>