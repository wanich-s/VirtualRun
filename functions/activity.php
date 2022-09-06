<?php
require 'config.php';
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getActivity();
        break;
    case 'POST':
        # code...
        break;
    case 'PUT':
        # code...
        break;
    default:
        # code...
        break;
}

function getActivity() {
    // global $mysqli;

    // $query = $mysqli -> query('SELECT ;');
    // $user = $query -> fetch_array(MYSQLI_ASSOC);
}

?>