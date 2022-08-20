$( document ).ready(function() {
    // Login state
    loginState();

    // $('#modalApplication').modal('show');

    var modalApplication = document.getElementById('modalApplication')
    modalApplication.addEventListener('show.bs.modal', function (event) {
        //do something...
        // alert('OK');
    });
    
    var modalLoginEl = document.querySelector('#modalLogin')
    modalLoginEl.addEventListener('shown.bs.modal', function (event) {
        $('#input-username').focus();
    });
    var modalLogin = bootstrap.Modal.getOrCreateInstance(modalLoginEl)

    $('#linkLogin').on('click', (e) => {
        let login = $('#linkLogin').attr('data-login');
        if(login === "true") {
            // show profile
        }else {
            modalLogin.show();
        }
    });

    $('#linkLogout').on('click', (e) => {
        logOut();
    });

    $('#btn-login').on('click', (e) => {
        e.preventDefault();
        logIn();
    });    

    function loginState() {
        $.ajax({
            method: "POST",
            url: "api.php",
            data: { func: "loginState" },
        }).done(function( res ) {
            try {
                let data = JSON.parse(res);                            
                if(data.logged) {
                    let username = capitalize(data.username);
                    $('#linkUser').html(`ชื่อผู้ใช้ ${username}`);
                    $('#linkUser').attr('data-login', true);
                    $('#liUser').show();
                    $('#liLogout').show();
                    $('#liLogin').hide();
                    // modalLogin.hide();
                }else{
                    $('#linkUser').attr('data-login', false);
                    $('#liLogin').show();
                }
            } catch (error) {
                console.log(error);
            }
        }).fail(function(response) {
            console.log(response);
        });
    }

    function logIn() {
        let user = $('#input-username').val();
        let pass = $('#input-password').val();
        $('#input-username').val('');
        $('#input-password').val('');
        $.ajax({
            method: "POST",
            url: "api.php",
            data: { 
                func: "login",
                username: user,
                password: pass
            }
        }).done(function( res ) {
            try {
                let data = JSON.parse(res);
                let username = capitalize(data.username);
                if(data.logged) {
                    $('#linkUser').html(`ชื่อผู้ใช้ ${username}`);
                    $('#linkUser').attr('data-login', true);
                    $('#liLogout').show();
                    $('#liLogin').hide();
                    $('#liUser').show();
                    modalLogin.hide();
                }
            } catch (error) {
                console.log(error);
            }
        }).fail(function(response) {
            console.log(response);
        });
    }

    function logOut() {
        let user = $('#input-username').val();
        let pass = $('#input-password').val();
        $('#input-username').val('');
        $('#input-password').val('');
        $.ajax({
            method: "POST",
            url: "api.php",
            data: { func: "logout" },
            async: false
        }).done(function( res ) {
            try {
                let data = JSON.parse(res);
                if(!data.logged) {
                    $('#linkLogin').html('เข้าสู่ระบบ');
                    $('#linkLogout').hide();
                }
            } catch (error) {
                console.log(error);
            }
        }).fail(function(response) {
            console.log(response);
        });
    }

    function capitalize(word) {
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }
});