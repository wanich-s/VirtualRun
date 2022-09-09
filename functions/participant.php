<?php
require 'config.php';    

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getParticipant();
        break;
    case 'POST':
        doRegister();
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function getParticipant() {
    global $mysqli;

    $query = $mysqli -> query("SELECT u.first_name, u.last_name, u.tel, u.shirt_size, u.address, p.id AS participant_id 
    FROM Users u 
    INNER JOIN Participant p ON u.id = p.user_id
    WHERE u.id = '$_SESSION[UserID]';");
    $participant = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if($participant) {
        echo json_encode(array('status' => true, 'participant' => $participant));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
}

function doRegister() {
    global $mysqli, $function;

    // Insert Users
    $sql = "INSERT INTO Users (user_name, password, first_name, last_name, email, id_card, tel, address, shirt_size, school, career)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssssssssss', $username, $password, $firstname, $lastname, $email, $idcard, $tel, $address, $shirtsize, $school, $career);
    
    $username = htmlspecialchars($_REQUEST['username']);
    $password = md5(htmlspecialchars($_REQUEST['password']));
    $email = htmlspecialchars($_REQUEST['email']);
    $firstname = htmlspecialchars($_REQUEST['firstname']);
    $lastname = htmlspecialchars($_REQUEST['lastname']);
    $idcard = htmlspecialchars($_REQUEST['idcard']);
    $tel = htmlspecialchars($_REQUEST['tel']);
    $address = htmlspecialchars($_REQUEST['address']);
    $shirtsize = htmlspecialchars($_REQUEST['shirtsize']);
    $career = empty($_REQUEST['career']) ? '0' : htmlspecialchars($_REQUEST['career']);
    $school = empty($_REQUEST['school']) ? '0' : htmlspecialchars($_REQUEST['school']);
    $activity_id = htmlspecialchars($_REQUEST['activity']);

    $stmt -> execute();    
    // $user_query = $mysqli -> query('SELECT LAST_INSERT_ID() AS user_id;');
    // $user = $user_query -> fetch_array(MYSQLI_ASSOC);
    $user_id = $stmt->insert_id;
    $stmt -> close();

    // Insert Applicant
    $applicant_query = $mysqli -> query("INSERT INTO Participant (user_id, activity_id, application_date)
    VALUES ($user_id, $activity_id, CURDATE());");

    // Disconnect
    $mysqli->close();

    if($user_id) {
        logged($user_id, $username);
        echo json_encode(array('func' => $function, 'status' => true, 'logged' => true, 'username' => $username));
        exit(0);
    }
    echo json_encode(array('func' => $function, 'status' => false, 'logged' => false));
}

?>