$( document ).ready(function() {
    // Login state
    loginState();
    // DataTable
    var table = $('#example').DataTable();
    // DatePicker
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('#datepicker1').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        endDate: end,
        minView: 0,
        maxView: 4,
        autoclose: true,
        todayBtn:true
    });

    // modalApplication
    var modalApplication = document.getElementById('modalApplication');
    if(modalApplication) {
        modalApplication.addEventListener('show.bs.modal', function (event) {
            const form = $('#formApplication');
            form.trigger("reset");
            form.removeClass('was-validated');
        });
    }
    
    // modalLogin
    var modalLoginEl = document.querySelector('#modalLogin');
    if(modalLoginEl) {
        modalLoginEl.addEventListener('shown.bs.modal', function (event) {
            $('#input-username').focus();
        });
        var modalLogin = bootstrap.Modal.getOrCreateInstance(modalLoginEl);
    }

    // modalApplication
    var modalApplicationEl = document.querySelector('#modalApplication');
    if(modalApplicationEl) {
        modalApplicationEl.addEventListener('shown.bs.modal', function (event) {
            // $('#input-username').focus();
        });
        var modalApplication = bootstrap.Modal.getOrCreateInstance(modalApplicationEl);
    }

    // modalManageApplicant
    var modalManageApplicantEl = document.querySelector('#modalManageApplicant');
    if(modalManageApplicantEl) {
        modalManageApplicantEl.addEventListener('shown.bs.modal', function (event) {
            // $('#input-username').focus();
        });
        var modalManageApplicant = bootstrap.Modal.getOrCreateInstance(modalManageApplicantEl);
    }

    // $('#btnParticipate').on('click', (e) => {
    //     $.ajax({
    //         method: "GET",
    //         url: "api.php",
    //         data: { activity: "1", func: "participate" },
    //     }).done(function( res ) {
    //         try {
    //             let user = JSON.parse(res);
    //             if(user.logged) {
    //                 showApplication(user);
    //                 modalApplication.show();
    //             }else{
    //                 modalLogin.show();
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }).fail(function( res ) {
    //         console.log(res);
    //     });
    // });

    // function showApplication(user) {
    //     $('#inputAppEmail').val(user.userinfo['email']);
    //     $('#inputAppFirstname').val(user.userinfo['first_name']);
    //     $('#inputAppLastname').val(user.userinfo['last_name']);
    //     $('#inputAppIDCard').val(user.userinfo['id_card']);
    //     $('#inputAppTel').val(user.userinfo['tel']);
    // }

    $( "input[name*='beAMemberWith']" ).on('change', (e) => {
        if($('#flexRadio1').is(":checked")) {
            $('#collapseCareer').show();
            $( "input[name*='career']" ).attr("required", "true");
            $( "#selectSchool" ).attr("required", "true");
        }else{
            $('#collapseCareer').hide();
            $( "input[name*='career']" ).removeAttr("required");
            $( "#selectSchool" ).removeAttr("required");
            $( "#selectSchool" ).val('');
            $( "input[name*='career']" ).prop('checked', false);
        }
    });

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

    $('#inputAppIDCard').on('keyup', function(e) {
        const IDCard = this.value;
        if(IDCard.length == 13) {
            checkIDCard(this);
        }
    });

    function checkIDCard(input) {
        $.ajax({
            method: "GET",
            url: "api.php",
            data: { func: "checkIDCard", idcard: input.value },
        }).done(function( res ) {
            try {
                let idcard = JSON.parse(res);
                if(!idcard.status) {
                    input.setCustomValidity('Error!');
                    input.addClass('required');
                }else{
                    input.setCustomValidity('');
                    input.removeClass('required');
                }
            } catch (error) {
                console.log(error);
            }
        }).fail(function(res) {
            console.log(res);
        });
    }

    function loginState() {
        $.ajax({
            method: "GET",
            url: "api.php",
            data: { func: "loginState" },
        }).done(function( res ) {
            try {
                let user = JSON.parse(res);
                userMenu(user);
            } catch (error) {
                console.log(error);
            }
        }).fail(function(res) {
            console.log(res);
        });
    }

    // function logIn() {
    //     let user = $('#input-username').val();
    //     let pass = $('#input-password').val();
    //     $('#input-username').val('');
    //     $('#input-password').val('');
    //     $.ajax({
    //         method: "POST",
    //         url: "api.php",
    //         data: { 
    //             func: "login",
    //             username: user,
    //             password: pass
    //         }
    //     }).done(function( res ) {
    //         try {
    //             let user = JSON.parse(res);
    //             userMenu(user);
    //             if(user.logged) {
    //                 modalLogin.hide();
    //             }else{
    //                 $('#loginAlert').html(alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'danger'));
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }).fail(function(response) {
    //         console.log(response);
    //     });
    // }

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

    window.addEventListener('load', function() {
        let forms = document.getElementsByClassName('needs-validation');
        const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                submitForm(form);
                event.preventDefault();
            }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    function submitForm(form) {
        $.ajax({
            method: "POST",
            url: $(form).attr('action'),
            data: $(form).serialize(),
        }).done(function( res ) {
            try {
                let user = JSON.parse(res);
                userMenu(user);
                if(user.logged) {
                    $(form).trigger("reset");
                    $(form).removeClass('was-validated');
                    $('.modal, .show').hide();
                }else{
                    $('#loginAlert').html(alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'danger'));
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
            // let username = capitalize(user.username);
            $('#linkUser').html(`ชื่อผู้ใช้ ${user.username}`);
            $('#linkUser').attr('data-login', true);
            if(user.profile === 'admin') {
                $('#liAdmin').show();
                $('#liManageActivity').show();
                $('#liManageApplicant').show();
                $('#liManageSender').show();   
            }else{
                $('#liAdmin').hide();
                $('#liManageActivity').hide();
                $('#liManageApplicant').hide();
                $('#liManageBankTransfer').show();
            }            
            $('#liRegister').hide();
            $('#liLogin').hide();
            $('#liUser').show();
            $('#liLogout').show();            
        }else{
            $('#linkUser').attr('data-login', false);
            $('#liRegister').show();
            $('#liAdmin').hide();
            $('#liLogin').show();
        }
    }

    function alert(message, type) {
        let wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        return wrapper;
    }

    function capitalize(word) {
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }
});