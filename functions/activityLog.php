<?php
require 'config.php';

switch (strtoupper($_REQUEST['_method'])) {
    case 'GET':
        if (isset($_REQUEST['participant'])) {
            getPersonalResult();
        } else {
            getResultBySchool();
        }
        break;
    case 'POST':
        if(is_activity_end()) {
            echo json_encode(array('func' => $function, 'status' => true, 'msg' => 'หมดเวลาส่งผลกิจกรรมแล้วค่ะ...'));
        } else {
            activityLog();
        }        
        break;
    case 'PATCH':
        getPersonalActivityLog();
        break;
    default:
        # code...
        break;
}

function is_activity_end() {
    $activity_end_date = new DateTime('2022-10-31 23:59:59 Asia/Bangkok');
    $now = new DateTime("now Asia/Bangkok");
    return $now > $activity_end_date;
}

function getResultBySchool() {
    global $mysqli;

    $activity_id = htmlspecialchars($_REQUEST['activity']);
    $school_id = htmlspecialchars($_REQUEST['school']);
    
    if($school_id) {
        $sql = "SELECT u.school AS school_id, COALESCE(s.school_name, 'บุคคลทั่วไป') AS school_name, COALESCE(c.career_title, '-') AS career_title, p.id AS participant_id, null AS name, u.first_name, u.last_name, SUM(al.distance) AS distance, p.bib_number
        FROM ActivityLog al
        INNER JOIN Participant p ON p.id = al.participant_id 
        INNER JOIN Users u ON u.id = p.user_id 
        LEFT JOIN Schools s ON u.school = s.id 
        LEFT JOIN Career c ON u.career = c.id
        WHERE p.activity_id = '$activity_id' 
        AND u.school = '$school_id'
        AND p.status IS NOT NULL
        AND NOT EXISTS (SELECT ad.user_id FROM Administrator ad WHERE u.id = ad.user_id AND ad.profile = 'admin') 
        GROUP BY al.participant_id
        ORDER BY distance DESC;";
    } else {
        $sql = "SELECT u.school AS school_id, COALESCE(s.school_name, 'บุคคลทั่วไป') AS school_name, SUM(al.distance) AS distance
        FROM ActivityLog al
        INNER JOIN Participant p ON p.id = al.participant_id
        INNER JOIN Users u ON u.id = p.user_id
        LEFT JOIN Schools s ON u.school = s.id
        WHERE p.activity_id = '$activity_id' 
        AND p.status IS NOT NULL
        AND NOT EXISTS (SELECT ad.user_id FROM Administrator ad WHERE u.id = ad.user_id AND ad.profile = 'admin') 
        GROUP BY u.school
        ORDER BY distance DESC, s.id IS NULL ASC;";
    }

    $result_by_school = array();
    $row_number = 1;
    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            $row['row_number'] = $row_number++;
            $row['name'] = $row['first_name'] . '  ' . $row['last_name'];
            $result_by_school[] = $row;
        }
        $result -> free_result();
    }

    $mysqli->close();
    if($result_by_school) {
        echo json_encode(array('status' => true, 'resultBySchool' => $result_by_school));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
}

function getPersonalResult() {
    global $mysqli;

    $participant_id = htmlspecialchars($_REQUEST['participant']);
    $activity_id = htmlspecialchars($_REQUEST['activity']);
    
    $sql = "SELECT NULL AS name, u.first_name, u.last_name
        , p.bib_number
        , COALESCE(SUM(al.distance), 0) AS distance
        , COALESCE(s.school_name, 'บุคคลทั่วไป') AS school_name
        , max(al.activity_date) AS last_update
        FROM Users u
        LEFT JOIN Schools s ON u.school = s.id
        INNER JOIN Participant p ON u.id = p.user_id
        LEFT JOIN ActivityLog al ON p.id = al.participant_id
        WHERE p.activity_id = '$activity_id'
        AND p.id = '$participant_id';";

    $personal_result = array();
    $row_number = 1;
    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            $row['row_number'] = $row_number++;
            $row['name'] = $row['first_name'] . '  ' . $row['last_name'];
            $personal_result[] = $row;
        }
        $result -> free_result();
    }

    $mysqli->close();
    if($personal_result) {
        echo json_encode(array('status' => true, 'personalResult' => $personal_result));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
}

function getPersonalActivityLog() {
    global $mysqli;

    $participant_id = htmlspecialchars($_REQUEST['participant']);

    $sql = "SELECT activity_date, activity_time, result_time, distance, activity_image1, activity_image2, activity_image3
        FROM ActivityLog
        WHERE participant_id = '$participant_id'
        ORDER BY id DESC;";

    $personal_activity = array();
    $row_number = 1;
    if ($result = $mysqli -> query($sql)) {
        while ($row = $result -> fetch_assoc()) {
            $row['row_number'] = $row_number++;
            $row['activity_image1'] = ($row['activity_image1']) ? '<img src="data:image/jpeg;base64,'.base64_encode($row['activity_image1']).'" class="figure-img img-fluid rounded" >' : '';
            $row['activity_image2'] = ($row['activity_image2']) ? '<img src="data:image/jpeg;base64,'.base64_encode($row['activity_image2']).'" class="figure-img img-fluid rounded" >' : '';
            $row['activity_image3'] = ($row['activity_image3']) ? '<img src="data:image/jpeg;base64,'.base64_encode($row['activity_image3']).'" class="figure-img img-fluid rounded" >' : '';
            $personal_activity[] = $row;
        }
        $result -> free_result();
    }

    $mysqli->close();
    if($personal_activity) {
        echo json_encode(array('status' => true, 'personalActivity' => $personal_activity));
        exit(0);
    } else {
        echo json_encode(array('status' => false));
    }
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