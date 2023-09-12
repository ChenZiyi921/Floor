
// 进页面根据URL参数填充是第几轮
function init() {
    var assign_batch_no = getUrlKey('assign_batch_no') || '';
    var family_id = getUrlKey('family_id') || '';
    var room_js = getUrlKey('room_js') || '';
    var room_type = getUrlKey('room_type') || '';
    var count = document.querySelector('.count');
    var room_detail = document.querySelector('.room_detail');
    var foot = document.querySelector('.foot');

    count.innerHTML = '【第' + assign_batch_no + '轮选房】'
    room_detail.innerHTML = room_js + room_type;

    if (!family_id) {
        foot.style.display = 'none';
    }
}

function switchClick() {
    var slide = document.querySelector('.slide')
    var switch_open = document.querySelector('.switch_open')
    var switch_close = document.querySelector('.switch_close')
    switch_open.addEventListener('click', function () {
        this.style.display = 'none';
        switch_close.style.display = 'block';
        slide.style.height = '132px'
    })
    switch_close.addEventListener('click', function () {
        this.style.display = 'none';
        switch_open.style.display = 'block';
        slide.style.height = '';
    })
}

// 左侧那个列表
function house_type_list_render() {
    $.ajax({
        url: base_url + "api/v10/roomType",
        type: "GET",
        data: {},
        contentType: "application/json",
        dataType: 'json',
        success: function (res) {
            if (res.status === 'success') {
                var room_js = getUrlKey('room_js') || '';
                var room_type = getUrlKey('room_type') || '';
                var house_type_list = document.querySelector('.house_type_list');
                var house_type_list_html = '';

                for (var i = 0; i < res.data.length; i++) {
                    var row_count = 0;
                    var html = ''
                    for (var j = 0; j < res.data[i].room_type.length; j++) {
                        row_count = res.data[i].room_type.length / 3
                        html +=
                            '<span class="room_type ' + (room_js === res.data[i].room_js && room_type === res.data[i].room_type[j].room_type ? 'active' : '') + '" room_js=' + res.data[i].room_js + ' room_type=' + res.data[i].room_type[j].room_type + '>' + res.data[i].room_type[j].room_type + '</span>';
                    }

                    var fill_html = '';
                    for (let k = 0; k < Math.ceil(row_count) - 1; k++) {
                        fill_html += '<span></span>';
                    }

                    house_type_list_html += '<div class="house_type">' +
                        '<div class="left">' +
                        '<span class="' + (room_js === res.data[i].room_js ? 'active' : '') + '">' + res.data[i].room_js + '</span>' +
                        fill_html +
                        '</div>' +
                        '<div class="right">' +
                        html
                        +
                        '</div>' +
                        '</div>';
                }
                house_type_list.innerHTML = house_type_list_html;
            }
        }
    });
}

// 右侧那个列表
function area_list_render() {
    $.ajax({
        type: "post",
        url: base_url + 'api/v10/placeInfo',
        data: { place: getUrlKey('place_name') },
        dataType: "json",
        success: function (res) {
            if (res.status === 'success') {
                var area_list = document.querySelector('.area_list');
                var house_total = document.querySelector('.house_total');
                var html = '';
                for (var i = 0; i < res.data.slice(0, 6).length; i++) {
                    html += '<div class="place_item" room_building="' + res.data[i].room_building + '">' +
                        '<p>' + res.data[i].room_building + '</p>' +
                        '<p>' + res.data[i].remain_total + '</p>' +
                        '</div>'
                }
                area_list.innerHTML = html;
                house_total.innerHTML = res.total_count;
                placeItemClick()
            }
        },
    });
}

// 楼栋点击
function placeItemClick() {
    var place_item = document.querySelectorAll('.place_item');
    for (var i = 0; i < place_item.length; i++) {
        place_item[i].addEventListener('click', function () {
            var params = jsonToParams({ place: getUrlKey('place_name'), room_building: this.getAttribute("room_building") });
            location.href = './unit_info.html?assign_batch_no=2&serial=0609&family_id=1295&' + params;
        })
    }
}

function to_back() {
    history.back()
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    switchClick();
    house_type_list_render();
    area_list_render();
})
