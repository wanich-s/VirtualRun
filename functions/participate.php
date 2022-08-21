<?php
    require 'config.php';
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            getParticipateInfo();
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

    function getParticipateInfo() {
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