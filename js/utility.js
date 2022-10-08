const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    a: 'rgb(220, 20, 60)',
    b: 'rgb(255, 127, 80)',
    c: 'rgb(250, 128, 114)',
    d: 'rgb(255, 165, 0)',
    e: 'rgb(218, 165, 32)',
    g: 'rgb(189, 183, 107)',
    h: 'rgb(255, 255, 0)',
    i: 'rgb(107, 142, 35)',
    j: 'rgb(173, 255, 47)',
    k: 'rgb(34, 139, 34)',
    l: 'rgb(32, 178, 170)',
    m: 'rgb(0, 255, 255)',
    n: 'rgb(72, 209, 204)',
    o: 'rgb(100, 149, 237)',
    p: 'rgb(65, 105, 225)',
    q: 'rgb(123, 104, 238)',
    r: 'rgb(186, 85, 211)',
    s: 'rgb(255, 0, 255)',
    t: 'rgb(210, 105, 30)',
    u: 'rgb(188, 143, 143)',
    v: 'rgb(112, 128, 144)',
    w: 'rgb(123, 104, 238)',
    x: 'rgb(240, 255, 240)'
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