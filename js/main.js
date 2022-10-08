var _modal = null; 
var _participant = null;

$( document ).ready(function() {
    (function() {        
        const reqData = { func: "activityLog", _method: 'get', activity: '1' };
        ajaxAPI('post', false, reqData, function(data) {
            $('#tableResultAll > tbody').html('');
            // $.each(data.activity_log, function(key, value) {
            //     $('#tableResultAll > tbody').append(`<tr data-activity_log="${ value['id'] }" style="line-height: 25px;">
            //         <td class="text-center align-middle">${ value['row_number'] }</td>
            //         <td class="align-middle"><a class='modalShowLogPerson'>${ value['school_name'] }</a></td>
            //         <td class="text-center align-middle">${ value['sum_distance'] }</td>
            //     </tr>`);
            // });
            $.each(data.resultBySchool, function(key, value) {
                $('#tableResultAll > tbody').append(`<tr data-school="${ value['school_id'] }" style="line-height: 25px;">
                    <td class="text-center align-middle">${ value['row_number'] }</td>
                    <td class="align-middle"><a href="resultBySchool.php?school_id=${ value['school_id'] }" target="_blank"><div style="overflow: scroll;">${ value['school_name'] }</div></a></td>
                    <td class="text-center align-middle">${ value['distance'] }</td>
                </tr>`);
            });
        });
    })();

    // ResultRankingSchool(function(data){
    //     if(data.status) {
    //         $('#tableResultSchool > tbody').html('');
    //         $.each(data.activity_log, function(key, value) {
    //             $('#tableResultSchool > tbody').append(`<tr data-activity_log="${ value['id'] }" style="line-height: 25px;">
    //                 <td class="text-center align-middle">${ value['row_number'] }</td>
    //                 <td class="align-middle">${ value['first_name'] }&nbsp;&nbsp;${ value['last_name'] }</td>
    //                 <td class="text-center align-middle bib-number">${ (value['bib_number']) ? value['bib_number'] : '' }</td>
    //                 <td class="text-center align-middle">${ value['sum_distance'] }</td>
    //             </tr>`);
    //         });
    //     }
    // }); 

    // Login state
    loginState(userMenu);
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

    // Enable tooltips everywhere
    $('[data-toggle="tooltip"]').tooltip();

    $( "input[name*='beAMemberWith']" ).on('change', (e) => {
        if($('#flexRadio1').is(":checked")) {
            $('#collapseCareer').show();
            $( "input[name='career']" ).attr("required", true);
            $( "#selectSchool" ).attr("required", true);
        } else {
            $('#collapseCareer').hide();
            $( "input[name='career']" ).removeAttr("required");
            $( "#selectSchool" ).removeAttr("required");
            $( "#selectSchool" ).val('');
            $( "input[name='career']" ).prop('checked', false);
            $( "#select-pick-up-place" ).val('');
            $( "#select-pick-up-place" ).removeAttr("required");
        }
    });

    $( "#selectSchool" ).on('change', function(e) {
        if($(this).val() == '9') {
            $('#pick-up-place').show();    
            $( "#select-pick-up-place" ).attr("required", true);
        } else {
            $('#pick-up-place').hide();
            $( "#select-pick-up-place" ).removeAttr("required");
            $( "#select-pick-up-place" ).val('');
        }
    });    

    $('#fileActivityImage').on('change', function(e) {
        const files = this.files
        if(files.length > 3 || files.length <= 0) {
            this.setCustomValidity('error');
            return;
        } else {
            this.setCustomValidity('');
        }
        if(files) {
            $('#previewActivityImage').html('');
            $.each(files, function(key, file) {
                let src = URL.createObjectURL(file);
                $('#previewActivityImage').append(`<img src="${src}" class="img-thumbnail" alt="" style="max-height: 150px;">`);
            });            
        }
    });

    $('#filePaymentslips').on('change', function(e) {
        const files = this.files;
        if(files) {
            $('#previewPaymentSlips').html('');
            $.each(files, function(key, file) {
                let src = URL.createObjectURL(file);
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
        } else {
            hour.prop('required',false);
            minute.prop('required',false);
            second.prop('required',false);
            hour.get(0).setCustomValidity('');
            minute.get(0).setCustomValidity('');
            second.get(0).setCustomValidity('');
        }
    });

    $('#btnForgetPassword').on('click', (e) => {
        const modalResetPassword = new bootstrap.Modal(modalResetPasswordEl, {
            keyboard: true
        });
        modalResetPassword.show();
        e.preventDefault();
    });

    $("#input-reset-idcard, #input-reset-email").on('blur', (e) => {
        const id_card = $("#input-reset-idcard").val();
        const email = $("#input-reset-email").val();
        if(id_card && email) {
            ajaxAPI('post', false, { func: 'resetPassword', _method: 'getResetUser', id_card: id_card, email: email }, function(data) {
                $('#reset-user-id').val(data.userInfo['id']);
                const form = document.getElementById('formResetPassword');
                mapFormElements(form, data.userInfo);
            });
        }
        e.preventDefault();
    });

    $('#linkLogout').on('click', (e) => {
        logOut();
    });

    $("input[name*='id_card']").on('keyup', function(e) {
        const input = this;
        checkIDCard(input, function(data) {
            if(data.status) {
                input.setCustomValidity('');
            } else {
                if(data.message) {
                    $('.check-idcard-feedback').html(data.message);
                    input.setCustomValidity('Error!');
                } else {
                    $('.check-idcard-feedback').html('ระบุเลขบัตรประชาชน (13หลัก) หรือเลขพาสปอร์ต (7-9หลัก)');
                    input.setCustomValidity('Error!');
                }
            }
        });
    });

    $("input[name*='user_name']").on('keyup', function(e) {
        const input = this;
        ajaxAPI('post', false, { func: 'checkUsername', _method: 'check', user_name: input.value }, function(data) {
            if(data.message) {
                $('.username-feedback').html(data.message);
                input.setCustomValidity('Error!');
            } else {
                $('.username-feedback').html('ชื่อผู้ใช้ a-z, A-Z, 0-9 อย่างน้อย 6 ตัวอักษร');
                input.setCustomValidity('');
            }
        });
    });

    $('#liActivityLog > a').on('click', function(e) {
        const modalActivityLog = new bootstrap.Modal(modalActivityLogEl, {
            keyboard: true
        });
        _modal = null;
        loginState(showModal, modalActivityLog);
        e.preventDefault();
    });

     $('.modalShowLogPerson').on('click', function(e) {
        const modalPreviewLog = new bootstrap.Modal(modalPreviewLogEl, {
            keyboard: true
        });
        // _modal = null;
        // loginState(showModal, modalActivityLog);
        modalPreviewLog.show();
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

// modalResetPassword
var modalResetPasswordEl = document.querySelector('#modalResetPassword');
if(modalResetPasswordEl) {
    modalResetPasswordEl.addEventListener('show.bs.modal', function (event) {
        _modal = null;
        const form = $('#formResetPassword');
        form.trigger("reset");
        form.removeClass('was-validated');
        $(":submit").prop('disabled', false);
    });
    modalResetPasswordEl.addEventListener('shown.bs.modal', function (event) {
        $("input[name*='id_card']").focus();
    });
}

// modalApplication
var modalApplication = document.getElementById('modalApplication');
if(modalApplication) {
    modalApplication.addEventListener('show.bs.modal', function (event) {
        const form = $('#formApplication');
        form.trigger("reset");
        form.removeClass('was-validated');
        $('#pick-up-place').hide();
        $( "input[name*='pickUpPlace']" ).attr("required", "true");
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

// modalMyInfo
var modalMyInfoEl = document.querySelector('#modalMyInfo');
if(modalMyInfoEl) {
    modalMyInfoEl.addEventListener('show.bs.modal', function (event) {
        const form = $('#formMyInfo');
         form.trigger("reset");
         form.removeClass('was-validated');
        ajaxAPI('GET', false, { func: 'myinfo', _method: 'get' }, function(data) {
            const form = document.getElementById('formMyInfo');
            mapFormElements(form, data.myinfo);
        });
    });
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
            $('#participant').val(`${ data.participant['participant_id'] }`);
            $('#input-school').val(`${ data.participant['school_name'] }`);
            $('#input-bib-number').val(`${ (data.participant['bib_number']) ? data.participant['bib_number'] : '' }`);
            $('#input-status').val(`${ data.participant['status'] }`);
            if(!(data.participant['bib_number'])) {
                $('#activityLogAlert').html(alert('กรุณารอผู้ดูแลระบบยืนยันสถานะการชำระเงิน เมื่อขึ้นสถานะการชำระเงินเรียบร้อย ถึงจะสามารถส่งผลวิ่งได้', 'danger'));
                $(":submit").prop('disabled', true);
            } else {
                $('#activityLogAlert').html('');
                $(":submit").prop('disabled', false);
            }
        });        
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
                $('#tableParticipants > tbody').html('');
                $.each(data.participates, function(key, value) {
                    $('#tableParticipants > tbody').append(`<tr data-participant="${ value['participant_id'] }" style="line-height: 25px;">
                        <td class="text-center align-middle">${ value['row_number'] }</td>
                        <td class="align-middle">${ value['first_name'] }&nbsp;&nbsp;${ value['last_name'] }</td>
                        <td class="text-center align-middle">${ value['tel'] }</td>
                        <td class="text-center">${ (value['payment_id']) ? '<a tabindex="0" class="btn" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="หลักฐานการชำระเงิน" data-bs-content="..."><i class="view-slips fa-sharp fa-solid fa-file-invoice fa-2x"></i></a>' : '' }</td>
                        <td class="text-center align-middle bib-number">${ (value['bib_number']) ? value['bib_number'] : '' }</td>
                        <td> ${ (value['payment_id']) ? ('<select class="form-select participant-status" aria-label="" style="min-width: 135px;">' +
                         ((value['status'] == '1') ? '<option selected value="1">ชำระเงินแล้ว</option>' : '<option selected></option><option value="1">ชำระเงินแล้ว</option>') +
                        '</select>') : '' }
                        </td>
                        <td class="text-center align-middle">${ value['shirt_size'] }</td>
                        <td class="align-middle">${ (value['pick_up_place']) ? value['pick_up_place'] : '' }</td>
                        <td><div style="text-align: center;"><a class="btn-print ${ (value['status'] == '1') ? '' : 'd-none' }" href="printAddress.php?participant=${ value['participant_id'] }&activity=1" target="_blank"><i class="fa-2x fa-solid fa-print"></i></a></div></td>
                    </tr>`);
                });
            }
        });
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
            let content = '';
            $participant = $(popoverTriggerEl).closest('tr').data('participant');
            const reqData = { func: 'getPaymentSlips', _method: 'post', participant: $participant };
            ajaxAPI('post', false, reqData, function(data) {
                if(data.status) {
                    let slips = '';
                    $.each(data.payment_slips, function(i, item) {
                        slips = slips.concat(item.payment_slips);
                    });
                    content = $(slips);
                }
            });
            new bootstrap.Popover(popoverTriggerEl, {
                html: true,
                content: content,
            });
        });
        // const popoverListTrigger = [...popoverTriggerList].map(popoverTriggerEl => {
        //     popoverTriggerEl.addEventListener('show.bs.popover', (event) => {
        //         // do something...
        //         // console.log('Add Event');                
        //         $(event.target).data('bs-content', 'xxx');
        //         // console.log($(event.target).data('bs-content'));
        //       });
        // });
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

// modalPreviewLog
var modalPreviewLogEl = document.querySelector('#modalShowLogPerson');
if(modalPreviewLogEl) {
    modalPreviewLogEl.addEventListener('show.bs.modal', function (event) {
        // console.log(_participant);
        ajaxAPI('GET', false, { func: 'activityLog', _method: 'get' }, function(data) {
            // const form = document.getElementById('formMyInfo');
            // mapFormElements(form, data.myinfo);
        });
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
        data: { func: "manageParticipant", _method: 'get', activity: "1" },
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

function checkIDCard(input, callback) {
    const value = input.value;
    if(value.length >= 7 && value.length <= 13) {
        $.ajax({
            method: "POST",
            url: "api.php",
            data: { func: "checkIDCard", _method: 'post', id_card: value },
        }).done(function( res ) {
            try {
                let data = JSON.parse(res);
                callback(data);
            } catch (error) {
                console.log(error);
            }
        }).fail(function(res) {
            console.log(res);
        });
    } else {
        callback({ status: false });
    }
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

function mapFormElements(form, data) {
    try {
        const inputs = Array.from(form.elements);
        inputs.map((el) => {
            if(data[el.name]) {
                el.value = data[el.name];
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function getParticipant(callback) {
    $.ajax({
        method: "GET",
        url: "api.php",
        data: { func: 'participant', _method: 'get', activity: '1' },
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

function serializeFormData(form) {
    let fd = new FormData();
    $.each($(form)[0], function(i, input) {
        switch (input.type) {
            case 'file':
                [].forEach.call(input.files, function (file) {
                    fd.append('files[]', file);
                });
                break;
            case 'radio':
                fd.append(input.name, $("input[name=" + input.name + "]:checked").val());
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
        case 'resetPassword':
            $('.alert-div').html(alert('รีเซ็ตรหัสผ่านเป็นเลขบัตรประชาชนของท่าน เรียบร้อยแล้ว', 'success'));
            break;
        case 'myinfo':
            if(data.status) {
                $('#myInfoAlert').html(alert('บันทึกข้อมูลเรียบร้อย', 'success'));
                setTimeout(() => {
                    $('#myInfoAlert').html('');
                }, timeout);
            } else {
                $('#myInfoAlert').html(alert('เกิดข้อผิดพลาด', 'danger'));
                setTimeout(() => {
                    $('#myInfoAlert').html('');
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
                $('#paymentDetailsAlert').html(alert('บันทึกข้อมูลเรียบร้อย กรุณารอผู้ดูแลระบบยืนยันสถานะการชำระเงิน', 'success'));
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

    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('participant-status')) {
            const value = $(event.target).val();
            if(value) {
                const participant_id = $(event.target.closest('tr')).data('participant');
                const reqData = { func: 'getBibNumber', _method: 'patch', activity: '1', participant: participant_id, status: value };
                ajaxAPI('post', false, reqData, function(data) {
                    $(event.target.closest('tr')).closest('tr').find('td.bib-number').html(data.bib_number);
                    $($(event.target.closest('tr')).closest('tr').find('a.btn-print')).removeClass('d-none');
                });
            }
        }
    }, false);

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-slips')) {
            // const participant_id = $(event.target.closest('tr')).data('participant');            
            // if(participant_id) {
            //     const popover = $(event.target.closest('tr')).closest('tr').find('[data-bs-toggle="popover"]');
            //     const reqData = { func: 'getPaymentSlips', _method: 'post', participant: participant_id };
            //     if($(popover).data('bs-content') === '...') {
            //         ajaxAPI('post', reqData, function(data) {
            //             // $(event.target.closest('tr')).closest('tr').find('[data-bs-toggle="popover"]').data('bs-content', data.payment_slips[0].payment_slips);
            //             $(event.target.parentElement).data('bs-content', data.payment_slips[0].payment_slips);
            //             // $('.popover-body').html(data.payment_slips[0].payment_slips);
            //         });
            //     } else {
            //         $('.popover-body').html('xxx');
            //     }
            // }
        }
    }, false);

})();

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
// const popoverListTrigger = [...popoverTriggerList].map(popoverTriggerEl => {
//     popoverTriggerEl.addEventListener('show.bs.popover', () => {
//         // do something...
//         console.log('Add Event');
//       });
// });
