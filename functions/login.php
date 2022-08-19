<?php
    session_start();
    // require 'config.php';

    // $sql = "SELECT * FROM Users";
    // $query = $mysqli -> query($sql);
    // $result = $query -> fetch_all(MYSQLI_ASSOC);
    $user_id = '1';
    if(!isset($_SESSION['LoggedIn'])) {
        $_SESSION[UserID] = $user_id;
        session_write_close();
    }
    
    
    echo json_encode(array("logged" => true));
?>
