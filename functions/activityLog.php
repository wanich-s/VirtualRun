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
    global $mysqli, $function;

    $hour = htmlspecialchars($_REQUEST['hour']);
    $hour = sprintf("%02d", $hour);
    $minute = htmlspecialchars($_REQUEST['minute']);
    $minute = sprintf("%02d", $minute);
    $second = htmlspecialchars($_REQUEST['second']);
    $second = sprintf("%02d", $second);

    $sql = "INSERT INTO ActivityLog (participant_id, activity_date, activity_time, result_time, distance, activity_image1, activity_image2, activity_image3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssssbbb', $participant_id, $activity_date, $activity_time, $result_time, $distance, $activity_image1, $activity_image2, $activity_image3);
    
    $participant_id = htmlspecialchars($_REQUEST['participant']);
    $activity_date = htmlspecialchars($_REQUEST['activitydate']);
    $activity_date = date("Y-m-d", strtotime($activity_date));
    $activity_time = htmlspecialchars($_REQUEST['activitytime']);
    $result_time = "$hour:$minute:$second";
    $distance = htmlspecialchars($_REQUEST['distance']);

    $tmp_file = $_FILES['files']['tmp_name'][0];
    if($tmp_file) {
        $fp = fopen($tmp_file, 'r');
        while (!feof($fp)) {
            $stmt->send_long_data(5, fread($fp, 8192));
        }
        fclose($fp);
    } else {
        $activity_image1 = '';
    }
    
    $tmp_file = $_FILES['files']['tmp_name'][1];
    if($tmp_file) {
        $fp = fopen($tmp_file, 'r');
        while (!feof($fp)) {
            $stmt->send_long_data(6, fread($fp, 8192));
        }
        fclose($fp);
    } else {
        $activity_image2 = '';
    }

    $tmp_file = $_FILES['files']['tmp_name'][2];
    if($tmp_file) {
        $fp = fopen($tmp_file, 'r');
        while (!feof($fp)) {
            $stmt->send_long_data(7, fread($fp, 8192));
        }
        fclose($fp);
    } else {
        $activity_image3 = '';
    }

    $stmt -> execute();
    if($stmt->insert_id) {
        $stmt -> close();
        echo json_encode(array('func' => $function, 'status' => true));
        exit(0);
    } else {
        echo json_encode(array('func' => $function, 'status' => false));
    }
    $stmt -> close();
}

?>