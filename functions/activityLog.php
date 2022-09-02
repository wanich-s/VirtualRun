<?php
require 'config.php';    

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        # code...
        break;
    case 'POST':
        activityLog();
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function activityLog() {

}

?>