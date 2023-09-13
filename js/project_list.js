var queryParams = {};

// 进页面根据URL参数填充是第几轮
function init() {
    var assign_batch_no = getUrlKey('assign_batch_no') || '';
    var family_id = getUrlKey('family_id') || '';
    var serial = getUrlKey('serial') || '';

    var count = document.querySelector('.count');
    var search = document.querySelector('.search');
    var input = document.querySelector('.input');
    var foot = document.querySelector('.foot');

    if (assign_batch_no) {
        count.innerHTML = '【第' + assign_batch_no + '轮选房】';
        count.style.display = 'block';
    }
    if (!family_id) {
        search.style.visibility = 'hidden';
        foot.style.display = 'none';
    } else {
        input.value = serial
    }
}

// swich 开关
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
                var house_type_list = document.querySelector('.house_type_list');
                var house_type_list_html = '';

                for (var i = 0; i < res.data.length; i++) {
                    var row_count = 0;
                    var html = ''
                    for (var j = 0; j < res.data[i].room_type.length; j++) {
                        row_count = res.data[i].room_type.length / 3
                        html +=
                            '<span class="room_type" room_js=' + res.data[i].room_js + ' room_type=' + res.data[i].room_type[j].room_type + '>' + res.data[i].room_type[j].room_type + '</span>';

                    }

                    var fill_html = '';
                    for (let k = 0; k < Math.ceil(row_count) - 1; k++) {
                        fill_html += '<span></span>';
                    }

                    house_type_list_html += '<div class="house_type">' +
                        '<div class="left">' +
                        '<span class="room_js" room_js="' + res.data[i].room_js + '">' + res.data[i].room_js + '</span>' +
                        fill_html +
                        '</div>' +
                        '<div class="right">' +
                        html
                        +
                        '</div>' +
                        '</div>';
                }
                house_type_list.innerHTML = house_type_list_html;
                queryPlaceJs();
                queryPlaceHouse();
            }
        }
    });
}

// 右侧那个列表
function area_list_render(room) {
    $.ajax({
        type: "post",
        url: base_url + 'api/v10/queryPlace',
        data: room || {},
        dataType: "json",
        success: function (res) {
            if (res.status === 'success') {
                var area_list = document.querySelector('.area_list');
                var house_total = document.querySelector('.house_total');
                var area_list_html = '';
                for (var i = 0; i < res.data.length; i++) {
                    area_list_html += '<div class="item" place_name="' + res.data[i].place_name + '">' +
                        '<img src="' + res.data[i].image + '" alt="">' +
                        '<div class="info">' +
                        '<div class="title">' + res.data[i].place_name + '地块</div>' +
                        '<div class="count">' + res.data[i].total + '</div>' +
                        '</div>' +
                        '</div>';
                }
                area_list.innerHTML = area_list_html;
                house_total.innerHTML = res.total_count;
                queryPlace();
            }
        },
    });
}

// 清空居室选中样式
function clearRoomJsClass() {
    var house_type_list = document.querySelector('.house_type_list');
    var items = house_type_list.querySelectorAll('.room_js');

    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

}

// 清空户型选中样式
function clearRoomTypeClass() {
    var house_type_list = document.querySelector('.house_type_list');
    var items = house_type_list.querySelectorAll('.room_type');

    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

}

// 居室点击事件
function queryPlaceJs() {
    var house_type_list = document.querySelector('.house_type_list');
    var items = house_type_list.querySelectorAll('.room_js');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove('active')
            }
            this.classList.add('active');
            clearRoomTypeClass();
            var room_js = this.getAttribute('room_js');
            queryParams = { room_js: room_js };
            area_list_render({ room_js: room_js });
            var room_detail = document.querySelector('.room_detail');
            room_detail.innerHTML = room_js;
        })
    }
}

// 户型点击事件
function queryPlaceHouse() {
    var house_type_list = document.querySelector('.house_type_list');
    var items = house_type_list.querySelectorAll('.room_type');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            for (var i = 0; i < items.length; i++) {
                items[i].classList.remove('active');
            }
            clearRoomJsClass();
            this.classList.add('active');
            this.parentNode.parentNode.querySelector('.left').querySelector('span').classList.add('active');
            var room_js = this.getAttribute('room_js');
            var room_type = this.getAttribute('room_type');
            queryParams = { room_js: room_js, room_type: room_type }
            area_list_render({ room_js: room_js, room_type: room_type });
            var room_detail = document.querySelector('.room_detail');
            room_detail.innerHTML = room_js + room_type;
        })
    }
}

// 跳转区域房源详情
function queryPlace() {
    var area_list = document.querySelector('.area_list');
    var items = area_list.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            var params = jsonToParams(Object.assign({}, queryParams, {
                assign_batch_no: getUrlKey('assign_batch_no') || "",
                family_id: getUrlKey('family_id') || "",
                place_name: this.getAttribute('place_name') || "",
                serial: getUrlKey('serial') || "",
            }))
            location.href = './area.html?' + params
        })
    }
}

// 返回index.html, 查询页面
function to_index() {
    var params = jsonToParams({
        assign_batch_no: getUrlKey('assign_batch_no') || "",
        family_id: getUrlKey('family_id') || "",
        serial: getUrlKey('serial') || "",
    })
    location.href = './index.html?' + params;
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    switchClick();
    house_type_list_render();
    area_list_render();
})
