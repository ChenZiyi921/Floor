var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

var serial, family_id;
var assign_batch_no = getUrlKey("assign_batch_no") || "";

// 进页面根据URL参数填充是第几轮
function init() {
  var title = document.querySelector(".title");
  title.innerHTML =
    "【第<span class='assign_batch_no'>" + assign_batch_no + "</span>轮选房】";
}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

function reQuery() {
  var input = document.querySelector(".input");
  var content = document.querySelector(".content");
  input.value = "";
  content.style.display = "none";
}

function queryClick() {
  var query = document.querySelector("#query");
  var input = document.querySelector(".input");
  query.addEventListener("click", function () {
    if (input.value) {
      customInfo(input.value);
    } else {
      closePopup();
      popupMessage.innerHTML = "请填写选房编号";
      popup.classList.add("show");
    }
  });
}

// 查询
function customInfo(val) {
  $.ajax({
    url: global.base_url + "api/v10/customInfo",
    type: "GET",
    data: {
      serial: val,
      assign_batch_no: assign_batch_no,
    },
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        if (res.data) {
          serial = res.data.serial;
          family_id = res.data.family_id;
          var detail = document.querySelector(".detail");
          detail.innerHTML =
            '<p><span class="left">选房序号：</span><span class="right">' +
            res.data.serial +
            "</span></p>" +
            '<p><span class="left">姓名：</span><span class="right">' +
            res.data.name +
            "</span></p>" +
            '<p><span class="left">身份证号码：</span><span class="right">' +
            res.data.id_card +
            "</span></p>" +
            '<p><span class="left">应安置面积：</span><span class="right">' +
            res.data.area_zuizhong +
            "</span></p>" +
            '<p><span class="left">预选方案：</span><span class="right">' +
            res.data.select_plan +
            "</span></p>" +
            '<p><span class="left">预选套数：</span><span class="right">' +
            res.data.select_total +
            "</span></p>" +
            '<p><span class="left">已选房屋：</span><span class="right">' +
            res.data.selected_room +
            "</span></p>" +
            '<p><span class="left">剩余安置面积：</span><span class="right">' +
            res.data.area_remain +
            "</span></p>";
          var content = document.querySelector(".content");
          content.style.display = "block";
        }
      } else {
        closePopup();
        popupMessage.innerHTML = res.msg;
        popup.classList.add("show");
      }
    },
  });
}

function to_project_list() {
  $.ajax({
    url: global.base_url + "api/v10/isSelection",
    type: "GET",
    data: {
      family_id: family_id,
    },
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var params = jsonToParams({
          assign_batch_no: assign_batch_no,
          family_id: family_id || "",
          serial: serial || "",
        });
        location.href = "./project_list.html?" + params;
      } else {
        closePopup();
        popupMessage.innerHTML = res.msg;
        popup.classList.add("show");
      }
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  queryClick();
});
