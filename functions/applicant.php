<?php
require 'config.php';    

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getApplicants();
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

function getPersonalInfo() {
    global $mysqli;
    $activity_id = htmlspecialchars($_REQUEST['activity']);
    $user_id = $_SESSION['UserID'];
    $query_user = $mysqli -> query("SELECT first_name, last_name, id_card, email, tel, address, shirt_size FROM Users WHERE id = '$user_id';");
    $user_info = $query_user -> fetch_array(MYSQLI_ASSOC);

    $query = $mysqli -> query("SELECT * FROM Participant WHERE user_id = '$user_id' AND activity_id = '$activity_id';");
    $participate_info = $query -> fetch_array(MYSQLI_ASSOC);

    $mysqli->close();
    echo json_encode(array('logged' => true, 'userinfo' => $user_info, 'participateinfo' => $participate_info));
}

function getApplicants() {
    global $mysqli;

    $query = $mysqli -> query("SELECT u.first_name, u.last_name, u.tel, u.shirt_size, u.address, p.bib_number, p.payment_slips FROM Users u INNER JOIN Participant p ON u.id = p.user_id;");
    $applicants = $query -> fetch_all(MYSQLI_ASSOC);
    $mysqli->close();
    echo json_encode(array('status' => true, 'applicants' => $applicants));
}

function doRegister() {
    global $mysqli;        

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
    $stmt -> close();
    $user_query = $mysqli -> query('SELECT LAST_INSERT_ID() AS user_id;');
    $user = $user_query -> fetch_array(MYSQLI_ASSOC);

    // Insert Applicant
    $applicant_query = $mysqli -> query("INSERT INTO Participant (user_id, activity_id, application_date)
    VALUES ($user[user_id], $activity_id, CURDATE());");

    // Disconnect
    $mysqli->close();

    if($user) {
        logged($user['user_id'], $username);
        exit(0);
    }
    echo json_encode(array("logged" => false));
}

?>