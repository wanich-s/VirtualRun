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
        logIn();
    });    

    function loginState() {
        $.ajax({
            method: "POST",
            url: "api.php",
            data: { func: "loginState" },
        }).done(function( res ) {
            try {
                let user = JSON.parse(res);                            
                userMenu(user);
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
                let user = JSON.parse(res);
                userMenu(user);
                modalLogin.hide();
            } catch (error) {
                console.log(error);
            }
        }).fail(function(response) {
            console.log(response);
        });
    }

    function logOut() {
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
                    $('#liAdmin').hide();
                    $('#liUser').hide();
                    $('#linkLogout').hide();
                    $('#liLogin').show();
                }
            } catch (error) {
                console.log(error);
            }
        }).fail(function(response) {
            console.log(response);
        });
    }

    function userMenu(user) {
        if(user.logged) {
            let username = capitalize(user.username);
            $('#linkUser').html(`ชื่อผู้ใช้ ${username}`);
            $('#linkUser').attr('data-login', true);
            if(user.profile === 'admin') {
                $('#liAdmin').show();
            }else{
                $('#liAdmin').hide();
            }
            $('#liLogin').hide();
            $('#liUser').show();
            $('#liLogout').show();
        }else{
            $('#linkUser').attr('data-login', false);
            $('#liAdmin').hide();
            $('#liLogin').show();
        }
    }

    function capitalize(word) {
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }
});