<?php
require 'config.php';    

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        # code...
        break;
    case 'POST':
        activityLog();
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function activityLog() {    
    global $mysqli;        

    // Insert Users
    $sql = "INSERT INTO ActivityLog (user_name, password, first_name, last_name, email, id_card, tel, address, shirt_size, school, career)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssssssssss', $username, $password, $firstname, $lastname, $email, $idcard, $tel, $address, $shirtsize, $school, $career);
    
    $username = htmlspecialchars($_REQUEST['username']);
}

?>