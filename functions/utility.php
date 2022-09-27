<?php
    function logged($user_id, $user_name, $user_profile='') {        
        $_SESSION['UserID'] = $user_id;
        $_SESSION['UserName'] = $user_name;
        $_SESSION['UserProfile'] = $user_profile;
        $_SESSION['LOGGED_TIME'] = time();
        session_write_close();        
    }

    function login_state() {
        if(isset($_SESSION['LOGGED_TIME']) && isset($_SESSION['UserID'])) {
            // session started more than 30 minutes ago
            if (time() - $_SESSION['LOGGED_TIME'] < 1800) {
                session_regenerate_id(true);
                $_SESSION['LOGGED_TIME'] = time();
                return true;
            }else{
                session_destroy();
            }
        }
        return false;
    }
    function logout() {
        session_destroy();
    }

    function check_id_card($id_card) {
        $chars = str_split($id_card);
        if(count($chars) != 13) return false;
        $lastDigit = array_pop($chars);
        $digit = 13; $sum = 0;
        foreach($chars as $char) {
            if(is_numeric($char)) {
                $sum += $char * $digit;
                $digit--;
            }else {
                return false;
            }
        }
        return (11 - ($sum % 11)) % 10 == $lastDigit;
    }

    function blobToImage($blob) {
        return '<img src="data:image/jpeg;base64,'.base64_encode($blob).'" class="img-fluid payment-slips" >';
    }

    function convert_no_to_text($number)
    {
        $txtnum1 = array('ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ');
        $txtnum2 = array('', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน');
        $number = str_replace(",", "", $number);
        $number = str_replace(" ", "", $number);
        $number = str_replace("บาท", "", $number);
        $number = explode(".", $number);
        if(sizeof($number) > 2)
        {
            return 'ทศนิยมหลายตัวนะจ๊ะ';
            exit;
        }
        $strlen = strlen($number[0]);
        $convert = '';
        for($i = 0; $i < $strlen; $i++)
        {
            $n = substr($number[0], $i, 1);
            if($n != 0)
            {
                if($i == ($strlen - 1) AND $n == 1)
                {
                    $convert .= 'เอ็ด';
                }
                elseif($i == ($strlen - 2) AND $n == 2)
                {
                    $convert .= 'ยี่';
                }
                elseif($i == ($strlen - 2) AND $n == 1)
                {
                    $convert .= '';
                }
                else
                {
                    $convert .= $txtnum1[$n];
                }
                $convert .= $txtnum2[$strlen - $i - 1];
            }
        }
        $convert .= 'บาท';
        if($number[1] == '0' OR $number[1] == '00' OR $number[1] == '')
        {
            $convert .= 'ถ้วน';
        }
        else
        {
            $strlen = strlen($number[1]);
            for($i = 0; $i < $strlen; $i++)
            {
                $n = substr($number[1], $i, 1);
                if($n != 0)
                {
                    if($i == ($strlen - 1) AND $n == 1)
                    {
                        $convert .= 'เอ็ด';
                    }
                    elseif($i == ($strlen - 2) AND $n == 2)
                    {
                        $convert .= 'ยี่';
                    }
                    elseif($i == ($strlen - 2) AND $n == 1)
                    {
                        $convert .= '';
                    }
                    else
                    {
                        $convert .= $txtnum1[$n];
                    }
                    $convert .= $txtnum2[$strlen - $i - 1];
                }
            }
            $convert .= 'สตางค์';
        }
        return $convert;
    }
?>