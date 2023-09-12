var popup = document.querySelector('.popup');
var popupMessage = document.querySelector('.popup-message');

// 进页面根据URL参数填充
function init() {
    var family_id = getUrlKey('family_id') || '';
    var confirmButton = document.querySelector('.btn2');
    if (family_id) {
        confirmButton.style.display = 'flex';
    }
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
            customInfo(input.value)
        } else {
            closePopup();
            popupMessage.innerHTML = '请填写选房编号';
            popup.classList.add('show');
        }
    })
}

// 查询
function customInfo(val) {
    $.ajax({
        url: base_url + "api/v10/customInfo",
        type: "GET",
        data: {
            "selectSn": val,
        },
        contentType: "application/json",
        dataType: 'json',
        success: function (res) {
            if (res.status === 'success') {
                var detail = document.querySelector('.detail');
                detail.innerHTML = '<p><span class="left">选房序号：</span><span class="right">' + res.data.selectSn + '</span></p>' +
                    '<p><span class="left">姓名：</span><span class="right">' + res.data.name + '</span></p>' +
                    '<p><span class="left">身份证号码：</span><span class="right">' + res.data.id_card + '</span></p>' +
                    '<p><span class="left">应安置面积：</span><span class="right">' + res.data.area_zuizhong + '</span></p>' +
                    '<p><span class="left">预选方案：</span><span class="right">' + res.data.select_plan + '</span></p>' +
                    '<p><span class="left">预选套数：</span><span class="right">' + res.data.select_total + '</span></p>' +
                    '<p><span class="left">已选房屋：</span><span class="right">' + res.data.selected_room + '</span></p>' +
                    '<p><span class="left">剩余安置面积：</span><span class="right">' + res.data.area_remain + '</span></p>';
                var content = document.querySelector('.content');
                content.style.display = 'block';
            } else {
                closePopup();
                popupMessage.innerHTML = res.msg;
                popup.classList.add('show');
            }
        }
    });
}

function to_project_list() {
    location.href = './project_list.html?assign_batch_no=2&serial=0609&family_id=1295'
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    // queryClick();
})
