<?php
    session_start();
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {        
        include 'functions/utility.php';
        $function = $_REQUEST['func'];
        $logged = login_state();        
        // check login status
        $allow_functions = array('loginState', 'login', 'application');
        if(!in_array($function, $allow_functions) && !$logged) {
            echo json_encode(array("logged" => false));
            exit(0);
        }

        switch ($function) {
            case 'login':
                include 'functions/login.php';
                break;
            case 'logout':
                logout();
                break;
            case 'application':
                include 'functions/application.php';
                break;
            default:
                if(login_state()) {
                    echo json_encode(array('logged' => true, 'username' => $_SESSION['UserName'], 'profile' => $_SESSION['UserProfile']));
                }else{
                    echo json_encode(array('logged' => false));
                }
                break;
        }
    }
?>
