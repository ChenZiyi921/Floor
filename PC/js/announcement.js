var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

// 进页面根据URL参数填充
function init() {}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

// 查询
function getAnnouncement() {
  $.ajax({
    url: global.base_url + "api/v10/selectedAnnouncement",
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
          html +=
            "<tr>" +
            '<td class="number">' +
            (i + 1) +
            "</td>" +
            '<td class="number">' +
            res.data[i].name +
            "</td>" +
            '<td class="number">' +
            res.data[i].place +
            "</td>" +
            '<td class="number">' +
            res.data[i].room_building +
            "</td>" +
            '<td class="number">' +
            res.data[i].room_danyuan +
            "</td>" +
            '<td class="number">' +
            res.data[i].room_number +
            "</td>" +
            '<td class="number">' +
            res.data[i].room_area +
            "</td>" +
            '<td class="number">' +
            res.data[i].hu_xing +
            "</td>" +
            '<td class="number">' +
            res.data[i].date +
            "</td>" +
            "</tr>";
        }
        tbody.innerHTML = html;
        autoScrollTable(res.count);
      } else {
        closePopup();
        popupMessage.innerHTML = res.msg;
        popup.classList.add("show");
      }
    },
  });
}
var timer;
function autoScrollTable(count) {
  var thead = document.querySelector(".thead");
  var today = document.querySelector(".today");

  var table = document.querySelector(".table-container"); // 表格元素
  var tableHeight = table.offsetHeight; // 表格的高度
  var container = document.querySelector(".unitInfo"); // 容器元素
  var containerHeight = container.offsetHeight; // 容器的高度

  // 每次滚动的距离
  var scrollDistance = 1; // 可根据需要调整滚动速度

  // 滚动函数
  function scroll() {
    if (table.scrollTop + tableHeight >= containerHeight) {
      console.log(table.scrollTop, tableHeight, containerHeight);
      // 达到底部时，回到顶部
      clearInterval(scrollInterval);
      getAnnouncement();
      table.scrollTop = 0;
    } else {
      // 向下滚动指定距离
      table.scrollTop += scrollDistance;
    }
  }

  // 检测是否够一页
  const flag =
    count >
    (window.innerHeight - today.offsetHeight - thead.offsetHeight - 24) / 46;
  if (flag) {
    // 开始自动滚动
    var scrollInterval = setInterval(scroll, 100); // 可根据需要调整滚动间隔
  } else {
    function doSomething() {
      getAnnouncement();
      clearTimeout(timer);
      timer = setTimeout(doSomething, 1000 * 60 * 10);
    }
    timer = setTimeout(doSomething, 1000 * 60 * 10); // 十分钟
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  getAnnouncement();
});
