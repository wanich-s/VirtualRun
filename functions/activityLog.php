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
    $sql = "INSERT INTO ActivityLog (participant_id, activity_date, activity_time, result_time, distance, activity_image1, activity_image2, activity_image3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssssbbb', $participant_id, $activity_date, $activity_time, $result_time, $distance, $activity_image1, $activity_image2, $activity_image3);
    
    $participant_id = htmlspecialchars($_REQUEST['participant']);
    $activity_date = htmlspecialchars($_REQUEST['activitydate']);
    $activity_time = htmlspecialchars($_REQUEST['activitytime']);
    $result_time = htmlspecialchars($_REQUEST['resulttime']);
    $distance = htmlspecialchars($_REQUEST['distance']);

    // $stmt -> execute();
    // $stmt -> close();
}

?>