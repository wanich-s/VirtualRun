<?php
	session_start();
    require_once('config.php'); 
	echo $sql = "SELECT * FROM Runner ";
    $result = $mysqli -> query($sql);
    
    $row = $result -> fetch_all(MYSQLI_ASSOC);
    print_r($row);
    echo '<br><br><br>';
    echo json_encode(array("data" => $row));
    // echo "<table border='1' style='width: 800px'>
    //     <tbody>
    //       <tr>
    //         <td>ID</td>
    //         <td>ID Card</td>
    //         <td>First Name</td>
    //         <td>Last Name</td>
    //         </td>
    //       </tr>"; 
    // while($row = mysqli_fetch_array($result)){ 
    //     echo "<tr>
    //         <td>".$row['id']."</td>
    //         <td>".$row['id_card']."</td>
    //         <td>".$row['first_name']."</td>
    //         <td>".$row['last_name']."</td>
    //       </tr>"; 
    // }
    // echo "</tbody>
    // </table>";
    $mysqli->close();
?>