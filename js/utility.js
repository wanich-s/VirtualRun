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