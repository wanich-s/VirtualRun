// ModalPersonalResult
var modalPersonalResultEl = document.querySelector('#modalPersonalResult');
if(modalPersonalResultEl) {
    modalPersonalResultEl.addEventListener('show.bs.modal', function (event) {
        const participant_id = $(event.target.closest('tr')).data('participant-id');
        ajaxAPI('get', false, { func: 'personalResult', _method: 'get', participant: participant_id }, function(data) {
            
        });
    });
}

$(document).ready(function () {
    (function() {
        const school_id = $('#table-result-by-school').data('school-id');
        ajaxAPI('get', false, { func: 'activityLog', _method: 'get', activity: '1', school: school_id }, function(data) {
            $('#table-result-by-school > tbody').html('');
            $.each(data.resultBySchool, function(key, value) {
                $('#table-result-by-school > tbody').append(`<tr data-participant-id="${ value['participant_id'] }" style="line-height: 25px;">
                    <td class="text-center align-middle">${ value['row_number'] }</td>
                    <td class="align-middle"><a href="" class="link-personal-result">${ value['name'] }</a></td>
                    <td class="text-center align-middle">${ value['bib_number'] }</td>
                    <td class="text-center align-middle">${ value['distance'] }</td>
                </tr>`);
            });
        });
    })();
});

(function() {
    'use strict';
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('link-personal-result')) {
            const modalPersonalResult = new bootstrap.Modal(modalPersonalResultEl, {
                keyboard: true
            });
            modalPersonalResult.show();
        }
        event.preventDefault();
    }, false);

})();
