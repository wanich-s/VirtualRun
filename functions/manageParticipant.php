<?php
require 'config.php';    

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getParticipantAll();
        break;
    case 'POST':
        # code...
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function getParticipantAll() {
    global $mysqli, $function;

    $sql = "SELECT u.first_name, u.last_name, u.id_card, u.email, u.tel, u.address, u.shirt_size, u.career, u.school, pd.payment_slips 
    FROM Users u 
    INNER JOIN Participant p ON u.id = p.user_id 
    INNER JOIN Activity a ON a.id = p.activity_id 
    LEFT JOIN PaymentDetails pd ON p.id = pd.customer_id 
    WHERE a.id = '1';";
    
    $participates;

    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            $row['payment_slips'] = blobToImage($row['payment_slips']);
            // $participates[] = array('firstname' => $row['first_name'], 'lastname' => $row['last_name']);
            $participates[] = $row;
        }
        $result -> free_result();
    }

    $mysqli->close();
    if($participates) {
        echo json_encode(array('status' => true, 'participates' => $participates));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
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

?>