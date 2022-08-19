<?php    
    require 'config.php';
    $user_name = htmlspecialchars($_REQUEST['username']);
    $password = htmlspecialchars($_REQUEST['password']);
    // $user_name = 'wanich';
    // $password = 'wanich';
    $sql = "SELECT id, user_name FROM Users WHERE user_name = ? AND password = MD5('$password');";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('s', $user_name); // 's' specifies the variable type => 'string'
    $stmt -> execute();
    $query = $stmt -> get_result();
    $user = $query -> fetch_array(MYSQLI_ASSOC);
    if($user) {
        $_SESSION['UserID'] = $user['id'];
        $_SESSION['LOGGED_TIME'] = time();
        session_write_close();
        echo json_encode(array('logged' => true, 'username' => $user['user_name']));
        exit(0);
    }
    echo json_encode(array("logged" => false));
?>
