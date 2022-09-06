<?php    
require 'config.php';
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        # code...
        break;
    case 'POST':
        login();
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function login() {
    global $mysqli, $function;
    
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
        logged($user['id'], $user['user_name'], $user['profile']);
        echo json_encode(array('func' => $function, 'logged' => true, 'username' => $user['user_name'], 'profile' => $user['profile']));
        exit(0);
    }
    echo json_encode(array('func' => $function, 'logged' => false));
}
?>
