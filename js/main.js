var _modal = null; 

$( document ).ready(function() {    
    // Login state
    loginState(userMenu);
    // DataTable
    var table = $('#example').DataTable();
    // DatePicker
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    $('#activitydate').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        endDate: end,
        minView: 0,
        maxView: 4,
        autoclose: true,
        todayBtn:true
    });

    $('#paymentdate').datepicker({
        format: "dd-mm-yyyy",
        todayHighlight: true,
        endDate: end,
        minView: 0,
        maxView: 4,
        autoclose: true,
        todayBtn:true
    });

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

    $('#fileActivityImage').on('change', function(e) {
        const files = this.files
        if(files.length > 3 || files.length <= 0) {
            this.setCustomValidity('error');
            return;
        }else {
            this.setCustomValidity('');
        }
        if (files) {
            $('#previewActivityImage').html('');
            $.each(files, function(key, file) {
                let src = URL.createObjectURL(file)
                $('#previewActivityImage').append(`<img src="${src}" class="img-thumbnail" alt="" style="max-height: 150px;">`);
            });            
        }
    });

    $('#filePaymentslips').on('change', function(e) {
        const files = this.files
        // if(files.length > 3 || files.length <= 0) {
        //     this.setCustomValidity('error');
        //     return;
        // }else {
        //     this.setCustomValidity('');
        // }
        if (files) {
            $('#previewPaymentSlips').html('');
            $.each(files, function(key, file) {
                let src = URL.createObjectURL(file)
                $('#previewPaymentSlips').append(`<img src="${src}" class="img-thumbnail" alt="" style="max-height: 150px;">`);
            });
        }
    });

    $('.hour, .minute, .second').on('change', function(e) {
        const hour = $('.hour');
        const minute = $('.minute');
        const second = $('.second');
        let h = hour.val() == "" ? 0 : hour.val();
        let m = minute.val() == "" ? 0 : minute.val();
        let s = second.val() == "" ? 0 : second.val();
        if((h + m + s) <= 0) {
            hour.get(0).setCustomValidity('error');
            minute.get(0).setCustomValidity('error');
            second.get(0).setCustomValidity('error');            
            hour.prop('required',true);
            minute.prop('required',true);
            second.prop('required',true);
        }else {
            hour.prop('required',false);
            minute.prop('required',false);
            second.prop('required',false);
            hour.get(0).setCustomValidity('');
            minute.get(0).setCustomValidity('');
            second.get(0).setCustomValidity('');
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

    $('#liActivityLog > a').on('click', function(e) {
        const modalActivityLog = new bootstrap.Modal(modalActivityLogEl, {
            keyboard: true
        });
        _modal = null;
        loginState(showModal, modalActivityLog);
        e.preventDefault();
    });

    $('#liPaymentDetails > a').on('click', function(e) {
        const modalPaymentDetails = new bootstrap.Modal(modalPaymentDetailsEl, {
            keyboard: true
        });
        _modal = null;
        loginState(showModal, modalPaymentDetails);
        e.preventDefault();
    });

    $( window ).on('focus', function(e) {
        loginState(userMenu);
    });
});

// modalLogin
var modalLoginEl = document.querySelector('#modalLogin');
if(modalLoginEl) {
    modalLoginEl.addEventListener('show.bs.modal', function (event) {
        _modal = null;
        const form = $('#formLogin');
        form.trigger("reset");
        form.removeClass('was-validated');
        $(":submit").prop('disabled', false);
    });
    modalLoginEl.addEventListener('shown.bs.modal', function (event) {
        $('#input-username').focus();
    });
}

// modalApplication
var modalApplication = document.getElementById('modalApplication');
if(modalApplication) {
    modalApplication.addEventListener('show.bs.modal', function (event) {
        const form = $('#formApplication');
        form.trigger("reset");
        form.removeClass('was-validated');
        $(":submit").prop('disabled', false);
    });
}

 // modalSender
 var modalManageSender = document.getElementById('formManageSender');
 if(modalManageSender) {
     modalManageSender.addEventListener('show.bs.modal', function (event) {
         const form = $('#formManageSender');
         form.trigger("reset");
         form.removeClass('was-validated');
         $(":submit").prop('disabled', false);
     });
 }

var modalManageSenderEl = document.querySelector('#modalManageSender');
if(modalManageSenderEl) {
    modalManageSenderEl.addEventListener('shown.bs.modal', function (event) {
        $('#inputSenderAddress').focus();
        // SenderState();
        $(":submit").prop('disabled', false);
    });
    var modalManageSender = bootstrap.Modal.getOrCreateInstance(modalManageSenderEl);
}

// modalActivityLog
var modalActivityLogEl = document.querySelector('#modalActivityLog');
if(modalActivityLogEl) {
    modalActivityLogEl.addEventListener('show.bs.modal', function (event) {
        const form = $('#formActivityLog');
         form.trigger("reset");
         form.removeClass('was-validated');
         $('#previewActivityImage').html('');
         getParticipant((data) => {
            $('#participant').val(`${data.participant['participant_id']}`);
        });
        $(":submit").prop('disabled', false);
    });
}

// modalApplication
var modalApplicationEl = document.querySelector('#modalApplication');
if(modalApplicationEl) {
    modalApplicationEl.addEventListener('show.bs.modal', function (event) {
        $(":submit").prop('disabled', false);
    });
    modalApplicationEl.addEventListener('shown.bs.modal', function (event) {
        
    });
    var modalApplication = bootstrap.Modal.getOrCreateInstance(modalApplicationEl);
}

// modalManageApplicant
var modalManageApplicantEl = document.querySelector('#modalManageApplicant');
if(modalManageApplicantEl) {
    modalManageApplicantEl.addEventListener('show.bs.modal', function (event) {
        manageParticipants((data) => {
            if(data.status) {

                var data = [
                    {
                        "name":       "Tiger Nixon",
                        "position":   "System Architect",
                        "salary":     "$3,120",
                        "start_date": "2011/04/25",
                        "office":     "Edinburgh",
                        "extn":       "5421"
                    },
                    {
                        "name":       "Garrett Winters",
                        "position":   "Director",
                        "salary":     "$5,300",
                        "start_date": "2011/07/25",
                        "office":     "Edinburgh",
                        "extn":       "8422"
                    }
                ]

                $('#tableParticipants').DataTable( {
                    data: data.participants,
                    columns: [
                        { data: 'name' },
                        { data: 'position' }
                    ]
                } );

                // $('#tableParticipants > tbody').html('');
                // $.each(data.participates, function(key, value) {
                //     $('#tableParticipants > tbody').append(`<tr>
                //         <td>${value['first_name']}</td>
                //         <td>${value['last_name']}</td>
                //         <!-- <td>${value['tel']}</td> -->
                //         <!-- <td>${value['shirt_size']}</td> -->
                //         <td><img src="data:image/png;base64,${value['payment_slips']}" /></td>
                //         <td>${value['bib_number']}</td>
                //     </tr>`);    
                // });
            }
        });
        $(":submit").prop('disabled', false);
    });
}

// modalPaymentDetails
var modalPaymentDetailsEl = document.querySelector('#modalPaymentDetails');
if(modalPaymentDetailsEl) {
    modalPaymentDetailsEl.addEventListener('show.bs.modal', function (event) {
        $('#previewPaymentSlips').html('');
        getParticipant((data) => {
            $('#customer').val(`${data.participant['participant_id']}`);
        });
        $(":submit").prop('disabled', false);
    });
}

// modalManageSender
var modalManageSenderEl = document.querySelector('#modalManageSender');
if(modalManageSenderEl) {
    modalManageSenderEl.addEventListener('show.bs.modal', function (event) {
        SenderState();
    });
}

function manageParticipants(callback) {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: "manageParticipant" },
        async: false,
        cache: false,
        contentType: false,
        timeout: 60000,
    }).done(function(res) {
        try {
            let data = JSON.parse(res);
            callback(data);
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}

function getActivity() {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: "activity" },
    }).done(function(res) {
        try {
            let activityInfo = JSON.parse(res);
            // if(!idcard.status) {
            //     input.setCustomValidity('Error!');
            // } else {
            //     input.setCustomValidity('');
            // }
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}

function checkIDCard(input) {
    $.ajax({
        method: "POST",
        url: "api.php",
        data: { func: "checkIDCard", idcard: input.value },
    }).done(function( res ) {
        try {
            let idcard = JSON.parse(res);
            if(idcard.status) {
                input.setCustomValidity('');
            } else {
                if(idcard.message) {
                    $('#idCardFeedback').html(idcard.message);
                    input.setCustomValidity('Error!');
                } else {
                    $('#idCardFeedback').html('ระบุเลขบัตรประชาชน (13หลัก) หรือเลขพาสปอร์ต (7-9หลัก)');
                    input.setCustomValidity('Error!');
                }                
            }
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

function loginState(callback, modal = null) {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: "loginState" },
        async: false,
    }).done(function( res ) {
        try {
            let user = JSON.parse(res);
            callback(user, modal);
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}

function showModal(user, modal) {
    if(user.logged) {
        if(modal)
            modal.show();
    }else {
        const modalLogin = new bootstrap.Modal(modalLoginEl, {
            keyboard: true
        });
        modalLogin.show();
        _modal = modal;  // show this modal after success login
    }
}

function SenderState() {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: "sender" },
    }).done(function( res ) {
        try {
            let user = JSON.parse(res);
            if(user) {
                $('#inputSenderAddress').val(user.sender_info['address']);
                $('#inputSenderAddress').data('senderid', user.sender_info['id']);
                $('#formManageSender').attr('action', )
            }
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}

function getParticipant(callback) {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: "participant" },
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

function alert(message, type) {
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    return wrapper;
}

function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}

function userMenu(user) {
    if(user.logged) {
        $( '#liUser > a' ).html(`ชื่อผู้ใช้ ${user.username}`);
        if( user.profile === 'admin' ) {
            $('.adminMenu').show();
        } else {
            $( '.adminMenu' ).hide();
        }
        $( '#liRegister' ).hide();
        $( '.liLogged' ).show();
        $( '#liLogin' ).hide();
    } else {
        $( '.liLogged' ).hide();
        $( '#liRegister' ).show();
        $( '#liLogin' ).show();
        $( '#liRule' ).show();
    }
}

// $('input[type="file"]').on('change', function (e) {
//     [].forEach.call(this.files, function (file) {
//         fd.append('filename[]', file);
//     });
// });

// function uploadImage(inputFile) {
//     let fd = new FormData();
//     fd.append('func', 'uploadFile');
//     [].forEach.call(inputFile.files, function (file) {
//         fd.append('filename[]', file);
//     });
//     fd.append('file', files[0]);
//     $.ajax({
//         method: "POST",
//         url: 'api.php',
//         data: fd,
//         async: false,
//         cache: false,
//         contentType: false,
//         processData: false,
//         enctype: 'multipart/form-data',
//         timeout: 60000,
//     }).done(function(res) {
//         try {
//             let user = JSON.parse(res);
//         } catch (error) {
//             console.log(error);
//         }
//     }).fail(function(res) {
//         console.log(res);
//     });
// }

function serializeFormData(form) {
    let fd = new FormData();
    $.each($(form)[0], function(i, input) {
        switch (input.type) {
            case 'file':
                [].forEach.call(input.files, function (file) {
                    fd.append('files[]', file);
                });
                break;
            default:
                fd.append(input.name, input.value);
                break;
        }
    });
    return fd;
}

function afterSubmit(form, data) {
    const timeout = 5000;
    $(form).removeClass('was-validated');
    switch (data.func) {
        case 'login':
            if(data.logged) {
                userMenu(data);
                $('.modal, .show').hide();
                if(_modal) {
                    _modal.show();
                }
            } else {
                $('#loginAlert').html(alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'danger'));
                setTimeout(() => {
                    $('#loginAlert').html('');
                }, timeout);
            }            
            $(":submit").prop('disabled', false);
            break;
        case 'register':
            if(data.status) {
                userMenu(data);
                $('#applicationAlert').html(alert('บันทึกข้อมูลเรียบร้อย', 'success'));
                setTimeout(() => {
                    $(form).trigger('reset');
                    $(form).removeClass('was-validated');
                    $('#applicationAlert').fadeOut('fast');
                    $('.modal, .show').hide();
                }, timeout);
            } else {
                $('#applicationAlert').html(alert('เกิดข้อผิดพลาด !!!', 'danger'));
                setTimeout(() => {
                    $('#applicationAlert').fadeOut('fast');
                }, timeout);
                $(":submit").prop('disabled', false);
            }
            break;
        case 'paymentDetails':
            if(data.status) {
                $('#paymentDetailsAlert').html(alert('บันทึกข้อมูลเรียบร้อย', 'success'));
                setTimeout(() => {
                    $(form).trigger('reset');
                    $(form).removeClass('was-validated');
                    $('#paymentDetailsAlert').fadeOut('fast');
                    $('.modal, .show').hide();
                }, timeout);
            } else {
                $('#paymentDetailsAlert').html(alert('เกิดข้อผิดพลาด !!!', 'danger'));
                setTimeout(() => {
                    $('#paymentDetailsAlert').fadeOut('fast');
                }, timeout);
                $(":submit").prop('disabled', false);
            }
            break;
        case 'activityLog':
            if(data.status) {
                $('#activityLogAlert').html(alert('บันทึกข้อมูลเรียบร้อย', 'success'));
                setTimeout(() => {
                    $(form).trigger('reset');
                    $(form).removeClass('was-validated');
                    $('#activityLogAlert').fadeOut('fast');
                    $('.modal, .show').hide();
                }, timeout);
            } else {
                $('#activityLogAlert').html(alert('เกิดข้อผิดพลาด !!!', 'danger'));
                setTimeout(() => {
                    $('#activityLogAlert').fadeOut('fast');
                }, timeout);
                $(":submit").prop('disabled', false);
            }
            break;
        default:
            break;
    }
}

function submitForm(form, callback) {
    $.ajax({
        method: $(form).attr('method'),
        url: $(form).attr('action'),
        data: serializeFormData(form),
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        timeout: 60000,
    }).done(function(res) {
        try {
            let data = JSON.parse(res);
            callback(data);
        } catch (error) {
            console.log(error);
        }
    }).fail(function(res) {
        console.log(res);
    });
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }  else {
            $(":submit").prop('disabled', true);
            submitForm(form, function(data) {
                afterSubmit(form, data);
            });
            event.preventDefault();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();