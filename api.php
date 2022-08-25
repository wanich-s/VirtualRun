<?php
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
                include 'functions/register.php';
                break;
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
