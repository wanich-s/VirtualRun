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

    $sql = "INSERT INTO PaymentDetails (customer_id, payment_date, payment_time, payment_amount, payment_slips)
        VALUES (?, ?, ?, ?, ?);";
    $stmt = $mysqli -> prepare($sql);
    $stmt -> bind_param('sssdb', $customer_id, $payment_date, $payment_time, $payment_amount, $payment_slips);

    $customer_id = htmlspecialchars($_REQUEST['customer']);
    $payment_date = htmlspecialchars($_REQUEST['paymentdate']);
    $payment_date = date("Y-m-d", strtotime($payment_date));
    $payment_time = htmlspecialchars($_REQUEST['paymenttime']);
    $payment_amount = htmlspecialchars($_REQUEST['paymentamount']);

    $tmp_file = $_FILES['files']['tmp_name'][0];
    if($tmp_file) {
        $fp = fopen($tmp_file, 'r');
        while (!feof($fp)) {
            $stmt->send_long_data(4, fread($fp, 8192));
        }
        fclose($fp);
    } else {
        $payment_slips = '';
    }

    $stmt -> execute();
    if($stmt->insert_id) {
        $stmt -> close();
        echo json_encode(array('func' => $function, 'status' => true));        
        exit(0);
    } else {
        echo json_encode(array('func' => $function, 'status' => false));
    }
    $stmt -> close();
}

?>