<?php    
    require 'config.php';
    $user_name = 'wanich';
    $password = 'wanich';
    $sql = "SELECT id FROM Users WHERE user_name = '$user_name' AND password = MD5('$password');";
    $query = $mysqli -> query($sql);
    $user = $query -> fetch_array(MYSQLI_ASSOC);
    if($user) {
        $_SESSION['UserID'] = $result['ID'];
        $_SESSION['LOGGED_TIME'] = time();
        session_write_close();
        echo json_encode(array("logged" => true));    
    }
    echo json_encode(array("logged" => false));
?>
