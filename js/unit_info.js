var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

// 进页面根据URL参数填充是第几轮
function init() {
    // var assign_batch_no = getUrlKey('assign_batch_no') || '';
    // var title = document.querySelector('.title');
    // title.innerHTML = '【第' + assign_batch_no + '轮选房】'
}

function closePopup() {
    var popupClose = document.querySelector(".popup-close");
    popupClose.addEventListener("click", function () {
        popup.classList.remove("show");
    });
}

// function reQuery() {
//     var input = document.querySelector('.input');
//     var content = document.querySelector('.content');
//     input.value = '';
//     content.style.display = 'none';
// }

// function queryClick() {
//     var query = document.querySelector('#query');
//     var input = document.querySelector('.input');
//     query.addEventListener('click', function () {
//         if (input.value) {
//             buildingInfo(input.value)
//         } else {
//             closePopup();
//             popupMessage.innerHTML = '请填写选房编号';
//             popup.classList.add('show');
//         }
//     })
// }

// 查询
function buildingInfo() {
    $.ajax({
        url: base_url + "api/v10/buildingInfo",
        type: "GET",
        data: {
            place: getUrlKey("place") || "",
            room_building: getUrlKey("room_building") || "",
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            if (res.status === "success") {
                // 循环有几个单元，渲染thead
                var thead = document.querySelector(".thead");
                var haedHtml = "";
                for (var i = 0; i < res.danyuan.length; i++) {
                    haedHtml += "<th>" + res.danyuan[i].room_danyuan + "</th>";
                }
                thead.innerHTML = "<tr>" + "<th>楼层\\单元</th>" + haedHtml + "</tr>";

                var tbody = document.querySelector(".tbody");
                var bodyHtml = "";
                // 循环有多少楼层
                for (var i = 0; i < res.data.length; i++) {
                    var itemHtml = "";
                    // 循环有几个单元，供渲染户型使用
                    for (var j = 0; j < res.data[i].room_danyua.length; j++) {
                        var item = "";
                        for (
                            var k = 0;
                            k < res.data[i].room_danyua[j].room_info.length;
                            k++
                        ) {
                            var room_info = res.data[i].room_danyua[j].room_info[k];
                            item +=
                                '<div class="level">' +
                                '<p>' + (room_info.selected_custom_id > 0 ? '<span class="lock"><img src="./images/i_lock.png" alt=""></span>' : '') + room_info.room_number + '</p>' +
                                '<p>' + room_info.room_js + room_info.room_type + '</p>' +
                                '<p>' + room_info.room_area + '㎡</p>' +
                                '</div>';
                        }
                        itemHtml += '<td class="item">' + item + "</td>";
                    }
                    bodyHtml +=
                        "<tr>" + "<td class='number'>" + res.data[i].room_floor + "</td>" + itemHtml + "</tr>";
                }
                tbody.innerHTML = bodyHtml;
            } else {
                closePopup();
                popupMessage.innerHTML = res.msg;
                popup.classList.add("show");
            }
        },
    });
}

function to_project_list() {
    location.href = "./project_list.html?assign_batch_no=2&serial=0609&family_id=1295";
}

document.addEventListener("DOMContentLoaded", function () {
    buildingInfo();
});
