<?php
    function logged($user_id, $user_name, $user_profile='') {
        $_SESSION['UserID'] = $user_id;
        $_SESSION['UserName'] = $user_name;
        $_SESSION['UserProfile'] = $user_profile;
        $_SESSION['LOGGED_TIME'] = time();
        session_write_close();
        echo json_encode(array('logged' => true, 'username' => $user_name, 'profile' => $user_profile));
    }

    function login_state() {
        if(isset($_SESSION['LOGGED_TIME']) && isset($_SESSION['UserID'])) {
            // session started more than 30 minutes ago
            if (time() - $_SESSION['LOGGED_TIME'] < 1800) {
                session_regenerate_id(true);
                $_SESSION['LOGGED_TIME'] = time();
                return true;
            }else{
                session_destroy();
            }
        }
        return false;
    }
    function logout() {
        session_destroy();
        echo json_encode(array('logged' => false));
    }
?>