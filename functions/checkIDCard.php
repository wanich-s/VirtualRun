<?php
    require 'config.php';

    $query = $mysqli -> query("SELECT id FROM Users WHERE id_card = '$id_card';");
    $user = $query -> fetch_array(MYSQLI_ASSOC);
    $mysqli->close();
    if(!$user) {
        echo json_encode(array('status' => true));
        exit(0);
    }
    echo json_encode(array('status' => false, 'message' => 'เลขบัตรประชาชนนี้ถูกใช้ลงทะเบียนแล้ว'));
?>