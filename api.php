<?php
    session_start();
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {        
        
        $function = $_REQUEST['func'];        
        $logged = false;
        if(isset($_SESSION['LOGGED_TIME'])) {
            // session started more than 30 minutes ago
            if (time() - $_SESSION['LOGGED_TIME'] < 1800) {
                session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
                $_SESSION['LOGGED_TIME'] = time();  // update creation time
                $logged = true;
            }
        }
        // check login status
        $allow_functions = array('login', 'application');
        if(!in_array($function, $allow_functions) && !$logged) {
            echo json_encode(array("logged" => false));
            exit(0);
        }

        switch ($function) {
            case 'login':
                include 'functions/login.php';
                break;
            case 'application':
                include 'functions/application.php';
                break;
            default:
                echo json_encode(array("logged" => false));
                break;
        }
    }
?>
