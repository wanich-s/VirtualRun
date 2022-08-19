<?php
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {        

        if(isset($_SESSION['LOGGED_TIME'])) {
            // session started more than 30 minutes ago
            if (time() - $_SESSION['LOGGED_TIME'] < 1800) {
                session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
                $_SESSION['LOGGED_TIME'] = time();  // update creation time
            }else {
                echo json_encode(array("logged" => false));
                exit(0);
            }
        }else {
            echo json_encode(array("logged" => false));
            exit(0);
        }

        switch ($_REQUEST['func']) {
            case 'login':
                include 'functions/login.php';
                break;
            case 'application':
                include 'functions/application.php';
                break;
            default:
                # code...
                break;
        }
    }
?>
