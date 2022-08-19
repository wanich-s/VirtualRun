<?php
    require 'config.php';

    $sql = "SELECT * FROM Users";
    $query = $mysqli -> query($sql);
    $result = $query -> fetch_all(MYSQLI_ASSOC);
?>