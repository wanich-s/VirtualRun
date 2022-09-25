<?php

    session_start();
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {        
        include 'functions/utility.php';
        $function = $_REQUEST['func'];
        $logged = login_state();
        // check login status
        $allow_functions = array('loginState', 'login', 'register', 'checkUsername', 'checkIDCard', 'activityLog');
        if(!in_array($function, $allow_functions) && !$logged) {
            echo json_encode(array('func' => $function, 'logged' => false));
            exit(0);
        }

        switch ($function) {            
            case 'checkIDCard':
                $id_card = htmlspecialchars($_REQUEST['id_card']);
                if((strlen($id_card) < 7 || strlen($id_card) > 9) && strlen($id_card) != 13) {
                    echo json_encode(array('func' => $function, 'status' => false, 'msg' => 'เลขบัตรประชาชนไม่ถูกต้อง'));
                    break;
                }else if(strlen($id_card) == 13 && !check_id_card($id_card)) {
                    echo json_encode(array('func' => $function, 'status' => false, 'msg' => 'เลขบัตรประชาชนไม่ถูกต้อง'));
                    break;
                }
                include 'functions/checkIDCard.php';
                break;
            case 'manageParticipant':
            case 'getPaymentSlips':
            case 'getBibNumber':
                include 'functions/manageParticipant.php';
                break;
            case 'checkUsername':
            case 'register':
            case 'participant':
                include 'functions/participant.php';
                break;
            case 'myinfo':
            case 'login':
                include 'functions/user.php';
                break;
            case 'activityLog':
                include 'functions/activityLog.php';
                break;
            case 'sender':
                include 'functions/sender.php';
                break;
            case 'paymentDetails':
                include 'functions/payment.php';
                break;
            case 'logout':
                logout();
                echo json_encode(array('func' => $function, 'logged' => false));
                break;
            default:
                if(login_state()) {
                    echo json_encode(array('func' => $function, 'logged' => true, 'username' => $_SESSION['UserName'], 'profile' => $_SESSION['UserProfile']));
                }else{
                    echo json_encode(array('func' => $function, 'logged' => false));
                }
                break;
        }
    }
?>
