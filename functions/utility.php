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

    function check_id_card($id_card) {
        $chars = str_split($id_card);
        if(count($chars) != 13) return false;
        $lastDigit = array_pop($chars);
        $digit = 13; $sum = 0;
        foreach($chars as $char) {
            $sum += $char * $digit;
            $digit--;
        }
        return (11 - ($sum % 11)) % 10 == $lastDigit;
    }
?>