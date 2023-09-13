var popup = document.querySelector('.popup');
var popupMessage = document.querySelector('.popup-message');

// 进页面根据URL参数填充
function init() {

}

function closePopup() {
    var popupClose = document.querySelector('.popup-close');
    popupClose.addEventListener('click', function () {
        popup.classList.remove('show')
    })
}

function reQuery() {
    var input = document.querySelector('.input');
    var content = document.querySelector('.content');
    input.value = '';
    content.style.display = 'none';
}

function queryClick() {
    var query = document.querySelector('#query');
    var input = document.querySelector('.input');
    query.addEventListener('click', function () {
        if (input.value) {
            resourceHouseData(input.value)
        } else {
            closePopup();
            popupMessage.innerHTML = '请填写选房编号';
            popup.classList.add('show');
        }
    })
}

// 查询
function resourceHouseData(val) {
    $.ajax({
        url: base_url + "api/v10/resourceHouseData",
        type: "GET",
        data: {
            family_id: getUrlKey('family_id') || '',
            serial: getUrlKey('serial') || '',
            room_id: getUrlKey('room_id') || '',
            place: getUrlKey('place') || '',
            room_building: getUrlKey('room_building') || '',
            room_danyuan: getUrlKey('room_danyuan') || '',
            room_js: getUrlKey('room_js') || '',
            room_type: getUrlKey('room_type') || '',
        },
        contentType: "application/json",
        dataType: 'json',
        success: function (res) {
            if (res.status === 'success') {
                if (res.custom && res.house) {
                    var main = document.querySelector('.main');
                    main.innerHTML = '<div class="house_detail">' +
                        '<div class="left">' +
                        '<p>' +
                        '<span class="item"><span>被腾退人：</span>' +
                        '<span>' + res.custom.name + '</span></span>' +
                        '</p>' +
                        '<p>' +
                        '<span class="item"><span>楼号：</span><span>' + res.house.room_building + '</span></span>' +
                        '<span class="item"><span>单元号：</span><span>' + res.house.room_danyuan + '</span></span>' +
                        '</p>' +
                        '<p>' +
                        '<span class="item"><span>房号：</span><span>' + res.house.room_number + '</span></span>' +
                        '<span class="item"><span>户型：</span><span>' + res.house.room_type + '</span></span>' +
                        '</p>' +
                        '<p>' +
                        '<span class="item"><span>楼号选房面积：</span><span>' + res.house.room_area + '平米</span></span>' +
                        '<span class="item"><span>总楼层：</span><span>' + res.house.room_floor + '</span></span>' +
                        '</p>' +
                        '<p><span class="item"><span>所在楼层：</span><span>' + '' + '</span></span></p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="house_image">' +
                        '<img src="' + res.house.img + '" alt="">' +
                        '</div>';
                    var confirmButton = document.querySelector('.confirm_button');
                    var family_id = getUrlKey('family_id') || '';
                    if (res.house.selected_custom_id === 0 && family_id) {
                        confirmButton.style.display = 'flex';
                    }
                }
            } else {
                closePopup();
                popupMessage.innerHTML = res.msg;
                popup.classList.add('show');
            }
        }
    });
}

function to_project_list() {
    var params = jsonToParams = ({
        assign_batch_no: getUrlKey('assign_batch_no') || "",
        family_id: getUrlKey('family_id') || '',
        place: getUrlKey('place') || '',
        room_building: getUrlKey('room_building') || '',
        room_danyuan: getUrlKey('room_danyuan') || '',
        room_id: getUrlKey('room_id') || '',
        room_js: getUrlKey('room_js') || '',
        room_type: getUrlKey('room_type') || '',
        serial: getUrlKey('serial') || '',
    })
    location.href = './project_list.html?' + params;
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    resourceHouseData();
})
