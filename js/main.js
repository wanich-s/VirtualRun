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

     // modalSender
     var modalManageSender = document.getElementById('formManageSender');
     if(modalManageSender) {
         modalManageSender.addEventListener('show.bs.modal', function (event) {
             const form = $('#formManageSender');
             form.trigger("reset");
             form.removeClass('was-validated');
         });
     }

    var modalManageSenderEl = document.querySelector('#modalManageSender');
    if(modalManageSenderEl) {
        modalManageSenderEl.addEventListener('shown.bs.modal', function (event) {
            $('#inputSenderAddress').focus();
            // SenderState();
        });
        var modalManageSender = bootstrap.Modal.getOrCreateInstance(modalManageSenderEl);
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

    //modalResultAll
    var options = {
        responsive : true,
        maintainAspectRatio : false,
        indexAxis: 'x',
        legend :{
                    display : true, 
                    position : "bottom"
                },
        scales : {
                    yAxes : [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]},
        title : {
                    display : true,
                    position : "top",
                    text : "Bar Chart Example"
                },
        borderWidth: 1,
    } ; 
    var data1 = {
        labels : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"],
        datasets : [{
            label: 'My First Dataset',
            data: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
            backgroundColor: [
                'rgba(220,20,60, 0.2)',
                'rgba(255,127,80,0.2)',
                'rgba(250,128,114,0.2)',
                'rgba(255,165,0,0.2)',
                'rgba(218,165,32,0.2)',
                'rgba(189,183,107,0.2)',
                'rgba(255,255,0,0.2)',
                'rgba(107,142,35,0.2)',
                'rgba(173,255,47,0.2)',
                'rgba(34,139,34,0.2)',
                'rgba(32,178,170,0.2)',
                'rgba(0,255,255,0.2)',
                'rgba(72,209,204,0.2)',
                'rgba(100,149,237,0.2)',
                'rgba(65,105,225,0.2)',
                'rgba(123,104,238,0.2)',
                'rgba(186,85,211,0.2)',
                'rgba(255,0,255,0.2)',
                'rgba(210,105,30,0.2)',
                'rgba(188,143,143,0.2)',
                'rgba(112,128,144,0.2)',
                'rgba(123,104,238,0.2)',
                'rgba(240,255,240,0.2)'
            ],
            borderColor: [
                'rgb(220,20,60)',
                'rgb(255,127,80)',
                'rgb(250,128,114)',
                'rgb(255,165,0)',
                'rgb(218,165,32)',
                'rgb(189,183,107)',
                'rgb(255,255,0)',
                'rgb(107,142,35)',
                'rgb(173,255,47)',
                'rgb(34,139,34)',
                'rgb(32,178,170)',
                'rgb(0,255,255)',
                'rgb(72,209,204)',
                'rgb(100,149,237)',
                'rgb(65,105,225)',
                'rgb(123,104,238)',
                'rgb(186,85,211)',
                'rgb(255,0,255)',
                'rgb(210,105,30)',
                'rgb(188,143,143)',
                'rgb(112,128,144)',
                'rgb(123,104,238)',
                'rgb(240,255,240)'
                ],
        }]
    };
    var modalResultAll = document.getElementById('myChart');
    var myChart = new Chart(modalResultAll, {
        type : 'bar',
        data : data1,
        options: options
    });
    /* ******** Ex Chart doughnut ************ */
    // var data2 = {
    //     labels : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"],
    //     datasets: [{
    //       label: 'My First Dataset',
    //       data: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    //       backgroundColor: [
    //         'rgb(220,20,60)',
    //         'rgb(255,127,80)',
    //         'rgb(250,128,114)',
    //         'rgb(255,165,0)',
    //         'rgb(218,165,32)',
    //         'rgb(189,183,107)',
    //         'rgb(255,255,0)',
    //         'rgb(107,142,35)',
    //         'rgb(173,255,47)',
    //         'rgb(34,139,34)',
    //         'rgb(32,178,170)',
    //         'rgb(0,255,255)',
    //         'rgb(72,209,204)',
    //         'rgb(100,149,237)',
    //         'rgb(65,105,225)',
    //         'rgb(123,104,238)',
    //         'rgb(186,85,211)',
    //         'rgb(255,0,255)',
    //         'rgb(210,105,30)',
    //         'rgb(188,143,143)',
    //         'rgb(112,128,144)',
    //         'rgb(123,104,238)',
    //         'rgb(240,255,240)'
    //       ],
    //       hoverOffset: 4
    //     }]
    //   };

    // var modalResultAll = document.getElementById('myChart1');
    // var myChart1 = new Chart(modalResultAll, {
    //     type : 'doughnut',
    //     data : data2,
    // });

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
        if(IDCard.length >= 7 && IDCard.length <= 13) {
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

    function SenderState() {
        $.ajax({
            method: "GET",
            url: "api.php",
            data: { func: "sender" },
        }).done(function( res ) {
            try {
                let user = JSON.parse(res);
                $('#inputSenderAddress').val(user.sender_info)
            } catch (error) {
                console.log(error);
            }
        }).fail(function(res) {
            console.log(res);
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
            $('#liResultAll').show();
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