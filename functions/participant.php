<?php
require 'config.php';    

switch (strtoupper($_REQUEST['_method'])) {
    case 'GET':
        getParticipant();
        break;
    case 'POST':
        doRegister();
        break;
    case 'CHECK':
        checkUsername();
        break;
    default:
        # code...
        break;
}

function getParticipant() {
    global $mysqli;

    $query = $mysqli -> query("SELECT u.first_name, u.last_name, u.tel, u.shirt_size, u.address, p.id AS participant_id, p.bib_number
    , CASE WHEN p.status = 1 THEN 'ชำระเงินแล้ว' ELSE 'ยังไม่ชำระเงิน' END AS status
    , COALESCE(s.school_name, 'บุคคลทั่วไป') AS school_name 
    FROM Users u 
    LEFT JOIN Schools s ON u.school = s.id
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

function checkUsername() {
    global $mysqli;
    
    $user_name = htmlspecialchars($_REQUEST['user_name']);

    $query = $mysqli -> query("SELECT id FROM Users WHERE user_name = '$user_name';");
    $user = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if(!$user) {
        echo json_encode(array('status' => true));
        exit(0);
    }
    echo json_encode(array('status' => true, 'message' => 'ชื่อผู้ใช้นี้ถูกใช้แล้ว'));
}

function doRegister() {
    global $mysqli, $function;

    // Insert Users
    $sql = "INSERT INTO Users (user_name, password, first_name, last_name, email, id_card, tel, address, shirt_size, school, career, pick_up_place)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('ssssssssssss', $user_name, $password, $first_name, $last_name, $email, $id_card, $tel, $address, $shirt_size, $school, $career, $pick_up_place);
    
    $user_name = htmlspecialchars($_REQUEST['user_name']);
    $password = md5(htmlspecialchars($_REQUEST['password']));
    $email = htmlspecialchars($_REQUEST['email']);
    $first_name = htmlspecialchars($_REQUEST['first_name']);
    $last_name = htmlspecialchars($_REQUEST['last_name']);
    $id_card = htmlspecialchars($_REQUEST['id_card']);
    $tel = htmlspecialchars($_REQUEST['tel']);
    $address = htmlspecialchars($_REQUEST['address']);
    $shirt_size = htmlspecialchars($_REQUEST['shirt_size']);
    $career = empty($_REQUEST['career']) ? '0' : htmlspecialchars($_REQUEST['career']);
    $school = empty($_REQUEST['school']) ? '99' : htmlspecialchars($_REQUEST['school']);
    $pick_up_place = empty($_REQUEST['pick_up_place']) ? 'จัดส่งทางไปรษณีย์' : htmlspecialchars($_REQUEST['pick_up_place']);
    $activity_id = htmlspecialchars($_REQUEST['activity']);

    $stmt -> execute();
    $user_id = $stmt->insert_id;
    $stmt -> close();

    // Insert Applicant
    $applicant_query = $mysqli -> query("INSERT INTO Participant (user_id, activity_id, application_date)
    VALUES ($user_id, $activity_id, CURDATE());");

    // Disconnect
    $mysqli->close();

    if($user_id) {
        logged($user_id, $user_name);
        echo json_encode(array('func' => $function, 'status' => true, 'logged' => true, 'username' => $user_name));
        exit(0);
    }
    echo json_encode(array('func' => $function, 'status' => false, 'logged' => false));
}

?>