var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

// 进页面根据URL参数填充
function init() { }

function closePopup() {
    var popupClose = document.querySelector(".popup-close");
    popupClose.addEventListener("click", function () {
        popup.classList.remove("show");
    });
}

// 查询
function getAnnouncement() {
    $.ajax({
        url: base_url + "api/v10/selectedAnnouncement",
        type: "GET",
        data: {
            limit: 1000,
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            if (res.status === "success") {
                var today = document.querySelector(".today");
                var tbody = document.querySelector(".tbody");
                today.innerHTML = res.today + "选房公示";
                var html = "";
                for (var i = 0; i < res.data.length; i++) {
                    html += '<tr>' +
                        '<td class="number">' + res.data[i].name + '</td>' +
                        '<td class="number">' + res.data[i].place + '</td>' +
                        '<td class="number">' + res.data[i].room_building + '</td>' +
                        '<td class="number">' + res.data[i].room_danyuan + '</td>' +
                        '<td class="number">' + res.data[i].room_number + '</td>' +
                        '<td class="number">' + res.data[i].date + '</td>' +
                        '</tr>';

                }
                tbody.innerHTML = html;
                autoScrollTable()
                // ==============================================================


                // ==============================================================
            } else {
                closePopup();
                popupMessage.innerHTML = res.msg;
                popup.classList.add("show");
            }
        },
    });
}

function autoScrollTable() {
    let table = document.querySelector('.table-container'); // 表格元素
    let tableHeight = table.offsetHeight; // 表格的高度
    let container = document.querySelector('.unitInfo'); // 容器元素
    let containerHeight = container.offsetHeight; // 容器的高度

    // 每次滚动的距离
    let scrollDistance = 1; // 可根据需要调整滚动速度

    // 滚动函数
    function scroll() {
        if (table.scrollTop + tableHeight >= containerHeight) {
            // 达到底部时，回到顶部
            clearInterval(scrollInterval)
            getAnnouncement()
            table.scrollTop = 0;
        } else {
            // 向下滚动指定距离
            table.scrollTop += scrollDistance;
        }
    }

    // 开始自动滚动
    let scrollInterval = setInterval(scroll, 100); // 可根据需要调整滚动间隔
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    getAnnouncement();
});
