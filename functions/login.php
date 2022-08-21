<?php    
    require 'config.php';
    $user_name = htmlspecialchars($_REQUEST['username']);
    $password = htmlspecialchars($_REQUEST['password']);
    $sql = "SELECT u.id, u.user_name, a.profile
    FROM Users u 
    LEFT JOIN Administrator a ON u.id = a.user_id 
    WHERE user_name = ? AND password = MD5('$password');";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('s', $user_name); // 's' specifies the variable type => 'string'
    $stmt -> execute();
    $query = $stmt -> get_result();
    $user = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if($user) {
        $_SESSION['UserID'] = $user['id'];
        $_SESSION['UserName'] = $user['user_name'];
        $_SESSION['UserProfile'] = $user['profile'];
        $_SESSION['LOGGED_TIME'] = time();
        session_write_close();
        echo json_encode(array('logged' => true, 'username' => $user['user_name'], 'profile' => $user['profile']));
        exit(0);
    }
    echo json_encode(array("logged" => false));
?>
