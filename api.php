<?php
    // only ajax request
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        switch ($_REQUEST['func']) {
            case 'login':
                include ('functions/login.php');
                break;
            
            default:
                # code...
                break;
        }
    }
?>