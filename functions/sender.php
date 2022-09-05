<?php

    /*
    CREATE TABLE `Sender` (
        `id` int(11) NOT NULL,
        `address` text NOT NULL,
        `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    ALTER TABLE `Sender` ADD PRIMARY KEY (`id`);

    INSERT INTO `Sender` (`id`, `address`, `last_update`) VALUES (1, 'aaa', '2022-08-26 09:34:25');
    */
    require 'config.php';
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            getSenderInfo();
            break;
        case 'POST':
            doSender();
            break;
        case 'PUT':
            UpdateSender();
            break;
        default:
            # code...
            break;
    }

    function getSenderInfo() {
        global $mysqli;
        $query = $mysqli -> query("SELECT * FROM Sender;");
        $sender_info = $query -> fetch_array(MYSQLI_ASSOC);

        $mysqli->close();
        echo json_encode(array('logged' => true, 'sender_info' => $sender_info));
    }

    function doSender() {
        global $mysqli;        

        $sql = "INSERT INTO Sender (address)
            VALUES (?);";
        $stmt = $mysqli -> prepare($sql);
        $stmt -> bind_param('s',  $address); 

        $username = htmlspecialchars($_REQUEST['username']);
        $address = htmlspecialchars($_REQUEST['address']);
       
        $stmt -> execute();
        $stmt -> close();

        // Disconnect
        $mysqli->close();
        
        echo json_encode(array("logged" => false,'sql' => $sql));
    }

    function UpdateSender(){
        global $mysqli;        

        $sql = "INSERT INTO Sender (address)
            VALUES (?);";
        $stmt = $mysqli -> prepare($sql);
        $stmt -> bind_param('s',  $address); 

        $address = htmlspecialchars($_REQUEST['address']);
       
        $stmt -> execute();
        $stmt -> close();

        // Disconnect
        $mysqli->close();

        echo json_encode(array("logged" => false,'sql' => $sql));
    }

?>