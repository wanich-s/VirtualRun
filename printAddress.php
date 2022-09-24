<!DOCTYPE html>
<html>
<head>
    <link href='https://fonts.googleapis.com/css?family=Sarabun' rel='stylesheet'>
<style>
@media screen {
    .page {
        orientation : portrait;
        width: 21cm;
        min-height: 29.7cm; 
        padding: 1cm;
        margin: 1cm auto;
        border: 1px #000000 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        font-family: Sarabun; 
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        page-break-after: always;
    }
    .page-break { display:block; height:1px; page-break-before:always; }
}

@media print {
    .page {
        orientation : portrait;
        size: A4;
        font-family: Sarabun; 
        border: 1px #000000 solid;
    }
    .page-break { display:block;height:1px; page-break-before:always; }
}

.sender {
    color: black;
    margin: 20px;
    padding: 20px;
    font-family: Sarabun; 
    font-size: 14px;
}

.receive {
    color: black;
    margin-left: 5.5cm;
    margin-top: 2cm;
    font-family: Sarabun;
    font-size: 16px;
    border: 0px #000000 solid;
    display: block;
    border: 0px #000000 solid;
}

.receipt{
    color: black;
    margin-left: 0cm;
    margin-top: 1cm;
    font-family: Sarabun;
    font-size: 16px;
    border: 0px #000000 solid;
    display: block;
}
.photo, .text-center{ text-align: center; }
.text-right{ text-align: right; }
.row {display: grid; grid-template-columns: 3cm auto;}
.table > tbody > tr {
    line-height: 10mm;
}
.table{
    border-spacing: 0;
}
.box {
    background-color: gray;
    margin-left: 0cm;
    font-family: Sarabun;
    font-size: 20px;
    border: 1px #000000 solid;
    text-align: center;
}
.textamount {margin-top: 5mm;}

</style>

</head>
<body>

<?php
    require 'functions/config.php';
    global $mysqli;
    $query = $mysqli -> query("SELECT * FROM Sender;");
    $sender_info = $query -> fetch_array(MYSQLI_ASSOC);    

    $query = $mysqli -> query("SELECT u.ADDRESS as address,u.first_name,u.last_name,u.tel,u.shirt_size, p.bib_number 
                               FROM PARTICIPANT p 
                               INNER JOIN USERS u ON u.ID = p.USER_ID 
                               WHERE p.USER_ID = '2';");
    $receive_info = $query -> fetch_array(MYSQLI_ASSOC);    
    $mysqli->close();
?>


<div class="page">
    <div class="sender">
    <p style="font-weight: bold;">ผู้ส่ง</p>
    <p><?php echo $sender_info['address'];?></p>
    </div> 

    <div class="receive">
    <p style="font-weight: bold;">กรุณาจัดส่ง</p>
    <p><?php echo 'คุณ'.$receive_info['first_name'].' '.$receive_info['last_name'];?></p>
    <p><?php echo $receive_info['address'];?></p>
    <p><?php echo 'เบอร์ติดต่อ : '. $receive_info['tel'];?></p>
    <p><?php echo 'ขนาดเสื้อ : '.$receive_info['shirt_size'].($receive_info['bib_number'] != '' ?  '  (E-BIB : '.$receive_info['bib_number'].')' : '');?></p>
    </div> 
</div>

<div class="page-break">&nbsp;</div>
<div class="page">
    <div class="receipt">
    <p>เลขที่ใบเสร็จ </p>
    <div class="photo">
        <img src="../assets/logo/logo_oldtech.png" width="140" height="130">
    </div>
    <p class="text-center">ใบเสร็จรับเงิน สมาคมผู้ปกครองและครู</p>
    <p class="text-center">โรงเรียนสาธิต "พิบูลบำเพ็ญ"​ มหาวิทยาลัยบูรพา</p>
    <p class="text-center">73 ถ.บางแสนล่าง ต.แสนสุข อ.เมือง จ.ชลบุรี 20131 </p>
    <p class="text-right">วันที่.......................................................</p>

    <p>ได้รับเงินจาก <?php echo 'คุณ'.$receive_info['first_name'].' '.$receive_info['last_name'] .($receive_info['bib_number'] != '' ?  '  (E-BIB : '.$receive_info['bib_number'].')' : '');?></p>
    <table class='table' border =1 width=100% >
        <tr>
        <th>รายการ</th>
        <th>บาท</th>
        <th>สต.</th>
        </tr>
        <tr>
        <td >ค่าสมัครแข่งขัน</td>
        <td class='text-right'>450</td>
        <td class='text-right'>00</td>
        </tr>
        <tr>
        <td>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        </tr>
        <tr>
        <td>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        </tr>
        <tr>
        <td>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        <td class='text-right'>&nbsp;</td>
        </tr>
        <tr>
        <td class='text-right'>รวมเงิน</td>
        <td class='text-right'>450</td>
        <td class='text-right'>00</td></td>
        </tr>
        </table> 

        <div class="textamount">
        <div class="row">
        <span >จำนวนเงิน</span>
        <span class="box">สี่ร้อยห้าสิบบาทถ้วน</span></p>
        </div>
        </div>
        <p class="text-right">.......................................................ผู้รับเงิน</p>
        <p class="text-right">......................................................ตำแหน่ง</p>
    </div> 
</div>

</body>
</html>
