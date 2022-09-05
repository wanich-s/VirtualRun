<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');
    session_start();
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {        
        include 'functions/utility.php';
        $function = $_REQUEST['func'];
        $logged = login_state();
        // check login status
        $allow_functions = array('loginState', 'login', 'register', 'checkIDCard');
        if(!in_array($function, $allow_functions) && !$logged) {
            echo json_encode(array("logged" => false));
            exit(0);
        }

        switch ($function) {
            case 'checkIDCard':
                $id_card = htmlspecialchars($_REQUEST['idcard']);
                if((strlen($id_card) < 7 || strlen($id_card) > 9) && strlen($id_card) != 13) {
                    echo json_encode(array('status' => false, 'msg' => 'เลขบัตรประชาชนไม่ถูกต้อง'));
                    break;
                }else if(strlen($id_card) == 13 && !check_id_card($id_card)) {
                    echo json_encode(array('status' => false, 'msg' => 'เลขบัตรประชาชนไม่ถูกต้อง'));
                    break;
                }
                include 'functions/checkIDCard.php';
                break;
            case 'register':
                include 'functions/applicant.php';
                break;
            case 'login':
                include 'functions/login.php';
                break;
            case 'applicant':
                include 'functions/applicant.php';
                break;
            case 'activityLog':
                include 'functions/activityLog.php';
                break;
            case 'uploadFile':
                include 'functions/uploadFile.php';
                break;
            case 'sender':
                include 'functions/sender.php';
                break;
            case 'logout':
                logout();
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
