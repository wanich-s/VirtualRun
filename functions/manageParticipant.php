<?php
require 'config.php';    

switch (strtoupper($_REQUEST['_method'])) {
    case 'GET':
        getParticipantAll();
        break;
    case 'POST':
        getPaymentSlips();
        break;
    case 'PATCH':
        getBibNumer();
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

    $activity_id = htmlspecialchars($_REQUEST['activity']);

    $sql = "SELECT p.id AS participant_id, u.id, u.first_name, u.last_name, u.id_card, u.email, u.tel, u.address, u.shirt_size, u.career, u.school, u.pick_up_place, p.bib_number, p.status
    , GROUP_CONCAT(pd.id SEPARATOR ',') AS payment_id
    , SUBSTR(p.bib_number, 3, 4) AS seq
    FROM Users u 
    INNER JOIN Participant p ON u.id = p.user_id 
    INNER JOIN Activity a ON a.id = p.activity_id 
    LEFT JOIN PaymentDetails pd ON p.id = pd.customer_id 
    WHERE a.id = '$activity_id' AND NOT EXISTS (SELECT ad.user_id FROM Administrator ad WHERE u.id = ad.user_id AND ad.profile = 'admin') 
    GROUP BY p.id 
    ORDER BY p.bib_number IS NULL DESC, seq;";
    
    $participates = array();
    $row_number = 1;
    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            // $row['payment_slips'] = blobToImage($row['payment_slips']);
            // $payment_slips = array();
            // $payment_slips = explode("[]", $row['slips']);
            // $row['slips'] = blobToImage($payment_slips);
            // $row['payment_slips'] = array_map('blobToImage', $payment_slips);
            $row['row_number'] = $row_number++;
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

function getBibNumer() {
    global $mysqli, $function;

    $activity_id = htmlspecialchars($_REQUEST['activity']);
    $participant_id = htmlspecialchars($_REQUEST['participant']);

    $query = $mysqli -> query("SELECT p.id, p.bib_number, p.user_id, u.school FROM Participant p 
    INNER JOIN Users u ON p.user_id = u.id 
    WHERE p.id = '$participant_id';");

    $participant = $query -> fetch_array(MYSQLI_ASSOC);
    $bib_number = $participant['bib_number'];    

    if($bib_number) {
        // Disconnect
        $mysqli->close();
        echo json_encode(array('func' => $function, 'status' => true, 'bib_number' => $bib_number));
        exit(0);        
    } else {
        $insert_bib_seq = $mysqli -> query("INSERT INTO Bib_Number_seq (activity_id)
        VALUES ($activity_id);");

        if($mysqli->insert_id) {
            $query = $mysqli -> query("SELECT CASE WHEN COUNT(id) <= 0 THEN 1 ELSE COUNT(id) END AS seq FROM Bib_Number_seq WHERE activity_id = '$activity_id';");
            $bib_number_seq = $query -> fetch_array(MYSQLI_ASSOC);
        }
    }

    $bib_number = genBibNumber($bib_number_seq['seq'], $participant['school']);
    updateBibNumber($participant['id'], $bib_number);

    if($bib_number) {
        echo json_encode(array('func' => $function, 'status' => true, 'bib_number' => $bib_number));
    } else {
        echo json_encode(array('func' => $function, 'status' => false));
    }
    // Disconnect
    $mysqli->close();
}

function genBibNumber($seq, $prefix) {
    return sprintf('%02d', $prefix) . substr_replace('0000', $seq, -strlen($seq), strlen($seq));
}

function updateBibNumber($participant_id, $bib_number) {
    global $mysqli;

    // Update Participant
    $sql = "UPDATE Participant SET bib_number = '$bib_number', status = ? WHERE id = '$participant_id';";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('s', $status);
    
    $status = htmlspecialchars($_REQUEST['status']);

    $stmt -> execute();
    $affected_rows = $stmt->affected_rows;
    $stmt -> close();
}

function getPaymentSlips() {
    global $mysqli;

    $participant_id = htmlspecialchars($_REQUEST['participant']);

    $sql = "SELECT * FROM PaymentDetails WHERE customer_id = '$participant_id';";
    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            $row['payment_slips'] = blobToImage($row['payment_slips']);
            $payment_slips[] = $row;
        }
        $result -> free_result();
    }

    $mysqli->close();
    if($payment_slips) {
        echo json_encode(array('status' => true, 'payment_slips' => $payment_slips));
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