<?php
require 'config.php';
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        # code...
        break;
    case 'POST':
        paymentDetails();
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function paymentDetails() {
    global $mysqli, $function;
}

?>