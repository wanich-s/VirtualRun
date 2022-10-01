var _participant = null;
var myChart;
var data = {};

const config = { type: 'doughnut', data: data, options: { cutout: 70, responsive: false, plugins: { legend: { position: 'top', }, title: { display: true, text: '' } } }, };

function showActivityLog(totalDistance) {
    const data = myChart.data;
    const newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        backgroundColor: [],
        data: [],
    };

    ajaxAPI('get', true, { func: 'activityLog', _method: 'patch', participant: _participant }, function(res) {
        $('#img-activity-log').html('');
        $.each(res.personalActivity, function(i, value) {
            newDataset.data.push(value['distance']);
            const colorIndex = i % Object.keys(CHART_COLORS).length;
            newDataset.backgroundColor.push(Object.values(CHART_COLORS)[colorIndex]);
            $('#img-activity-log').append(`<figure class="figure">
                ${ value['activity_image1'] }
                ${ value['activity_image2'] }
                ${ value['activity_image3'] }
                <figcaption class="figure-caption text-end">ระยะทาง ${ value['distance'] } กิโลเมตร  วันที่ ${ convertToDateThai(new Date(value['activity_date'])) }  เวลา ${ value['activity_time'] }</figcaption>
            </figure>`);
        });

        myChart.config.options.plugins.title.text = `ระยะทางทั้งหมด ${ totalDistance } กิโลเมตร`
        myChart.data.datasets = []
        myChart.data.datasets.push(newDataset);
        myChart.update();        
    });    
}

// ModalPersonalResult
var modalPersonalResultEl = document.querySelector('#modalPersonalResult');
if(modalPersonalResultEl) {
    modalPersonalResultEl.addEventListener('show.bs.modal', function (event) {
        if(_participant) {
            ajaxAPI('get', false, { func: 'activityLog', _method: 'get', activity: '1', participant: _participant }, function(res) {
                const personalResult = res.personalResult[0];
                $("[name='user_name']").val(`${ personalResult['name'] }`);
                $("[name='bib_number']").val(`${ personalResult['bib_number'] }`);
                showActivityLog(personalResult['distance']);
            });
        }        
    });
}

$(document).ready(function () {
    (function() {
        const school_id = $('#table-result-by-school').data('school-id');
        ajaxAPI('get', false, { func: 'activityLog', _method: 'get', activity: '1', school: school_id }, function(data) {            
            $('#table-result-by-school > tbody').html('');
            $.each(data.resultBySchool, function(key, value) {
                $('#caption-school-name').html(`สังกัด ${ value['school_name'] }`);
                $('#table-result-by-school > tbody').append(`<tr data-participant="${ value['participant_id'] }" style="line-height: 25px;">
                    <td class="text-center align-middle">${ value['row_number'] }</td>
                    <td class="align-middle"><a href="" class="link-personal-result">${ value['name'] }</a></td>
                    <td class="text-center align-middle">${ value['career_title'] }</td>
                    <td class="text-center align-middle">${ value['bib_number'] }</td>
                    <td class="text-center align-middle">${ value['distance'] }</td>
                </tr>`);
            });
        });
        myChart = new Chart(
            document.getElementById('chart'),
            config
        );
    })();    
});

(function() {
    'use strict';
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('link-personal-result')) {
            _participant = $(event.target.closest('tr')).data('participant');
            const modalPersonalResult = new bootstrap.Modal(modalPersonalResultEl, {
                keyboard: true
            });
            modalPersonalResult.show();
        }
        event.preventDefault();
    }, false);

})();
