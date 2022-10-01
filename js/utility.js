const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function convertToDateThai( date ) {
    var month_th = [
        "",
        "มกราคม", 
        "กุมภาพันธ์", 
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ];
    return result = date.getDate()+" "+month_th[( date.getMonth()+1 )]+" "+( date.getFullYear()+543 );
}

function ajaxAPI(method, async, data, callback) {
    $.ajax({
        method: method,
        url: "api.php",
        data: data,
        async: async,
        cache: false,
        timeout: 60000,
    }).done(function( res ) {
        try {
            let data = JSON.parse(res);
            if(data.status) {
                callback(data);
            }
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}