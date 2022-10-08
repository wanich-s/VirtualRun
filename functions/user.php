<?php    
require 'config.php';
switch (strtoupper($_REQUEST['_method'])) {
    case 'GET':
        getMyInformation();
        break;
    case 'POST':
        login();
        break;
    case 'PUT':
        updateMyInformation();
        break;
    case 'GETRESETUSER':
        getUserInfo();
        break;
    case 'RESETPASSWORD':
        resetPassword();
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

function getUserInfo() {
    global $mysqli;

    $id_card = htmlspecialchars($_REQUEST['id_card']);
    $email = htmlspecialchars($_REQUEST['email']);

    $query = $mysqli -> query("SELECT u.id, u.user_name, u.first_name, u.last_name, u.id_card, u.email 
    FROM Users u 
    WHERE u.id_card = '$id_card' AND u.email = '$email'
    AND NOT EXISTS (SELECT ad.user_id FROM Administrator ad WHERE u.id = ad.user_id AND ad.profile = 'admin');");
    $user_info = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if($user_info) {
        echo json_encode(array('status' => true, 'userInfo' => $user_info));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
}

function resetPassword() {
    global $mysqli, $function;

    $user_id = htmlspecialchars($_REQUEST['user_id']);
    if(!$user_id) {
        echo json_encode(array('func' => $function, 'status' => false));
        exit(0);
    }
    // Reset Password
    $sql = "UPDATE Users SET password = ? WHERE id = '$user_id';";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('s', $password);
    
    $password = md5(htmlspecialchars($_REQUEST['reset-id-card']));

    $stmt -> execute();
    $affected_rows = $stmt->affected_rows;
    $stmt -> close();

    // Disconnect
    $mysqli->close();

    if($affected_rows) {
        echo json_encode(array('func' => $function, 'status' => true));
        exit(0);
    }
    echo json_encode(array('func' => $function, 'status' => false));
}

function getMyInformation() {
    global $mysqli, $function;
    $query = $mysqli -> query("SELECT u.first_name, u.last_name, u.id_card, u.email, u.tel, u.address, u.shirt_size, u.address, u.school, u.career 
    FROM Users u 
    WHERE u.id = '$_SESSION[UserID]';");
    $my_info = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if($my_info) {
        echo json_encode(array('status' => true, 'myinfo' => $my_info));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
}

function updateMyInformation() {
    global $mysqli, $function;

    $user_id = $_SESSION['UserID'];
        
    // Update Users
    $sql = "UPDATE Users SET first_name = ?, last_name = ?, email = ?, id_card = ?, tel = ?, address = ? , career = ? WHERE id = '$user_id';";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssssss', $first_name, $last_name, $email, $id_card, $tel, $address, $career);
    
    $first_name = htmlspecialchars($_REQUEST['first_name']);
    $last_name = htmlspecialchars($_REQUEST['last_name']);
    $email = htmlspecialchars($_REQUEST['email']);
    $id_card = htmlspecialchars($_REQUEST['id_card']);
    $tel = htmlspecialchars($_REQUEST['tel']);
    $address = htmlspecialchars($_REQUEST['address']);
    $career = htmlspecialchars($_REQUEST['career']);

    $stmt -> execute();
    $affected_rows = $stmt->affected_rows;
    $stmt -> close();

    // Disconnect
    $mysqli->close();

    if($affected_rows) {
        echo json_encode(array('func' => $function, 'status' => true));
        exit(0);
    }
    echo json_encode(array('func' => $function, 'status' => false));
}

?>
