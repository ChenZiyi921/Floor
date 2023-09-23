var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

var assign_batch_no = getUrlKey("assign_batch_no") || "";
var family_id = getUrlKey("family_id") || "";
var serial = getUrlKey("serial") || "";

// 进页面根据URL参数填充
function init() {}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

// 返回index.html, 查询页面
function to_index() {
  var params = jsonToParams({
    assign_batch_no: assign_batch_no || "",
  });
  location.href = "./index.html?" + params;
}

// 确认选房
function postResourceHouseData() {
  // 创建弹窗实例
  var myModal = new Modal({
    title: "特别提示",
    description: "点击“确定”按钮，期视为确认选房结果，\n选房结果不可更改。",
    showButton1: true,
    button1Text: "取消",
    onButton1Click: function () {
      myModal.close();
    },
    showButton2: true,
    button2Text: "确定",
    onButton2Click: function () {
      $.ajax({
        url: global.base_url + "api/v10/selectionComplete",
        type: "POST",
        data: {
          assign_batch_no: assign_batch_no,
          family_id: family_id,
          serial: serial,
          room_id: getUrlKey("room_id") || "",
          place: getUrlKey("place") || "",
          room_building: getUrlKey("room_building") || "",
          room_danyuan: getUrlKey("room_danyuan") || "",
          room_js: getUrlKey("room_js") || "",
          room_type: getUrlKey("room_type") || "",
        },
        dataType: "json",
        success: function (res) {
          if (res.status === "success") {
            var myModal2 = new Modal({
              title: "特别提示",
              description: res.data.prompt,
              showButton1: true,
              button1Text: "结算签约",
              onButton1Click: function () {
                myModal2.close();
                to_index();
              },
              showButton2: true,
              button2Text: "继续选房",
              onButton2Click: function () {
                var params = jsonToParams({
                  assign_batch_no: assign_batch_no,
                  family_id: family_id,
                  serial: serial,
                });
                location.href = "./project_list.html?" + params;
              },
            });
            myModal2.open();
          } else {
            closePopup();
            popupMessage.innerHTML = res.msg;
            popup.classList.add("show");
          }
        },
      });
    },
  });
  myModal.open();
}

// 查询
function getResourceHouseData(val) {
  $.ajax({
    url: global.base_url + "api/v10/resourceHouseData",
    type: "GET",
    data: {
      family_id: family_id,
      serial: serial,
      room_id: getUrlKey("room_id") || "",
      place: getUrlKey("place") || "",
      room_building: getUrlKey("room_building") || "",
      room_danyuan: getUrlKey("room_danyuan") || "",
      room_js: getUrlKey("room_js") || "",
      room_type: getUrlKey("room_type") || "",
    },
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        if (res.custom && res.house) {
          var main = document.querySelector(".main");
          main.innerHTML =
            '<div class="house_detail">' +
            '<div class="left">' +
            "<p>" +
            '<span class="item"><span>被腾退人：</span>' +
            "<span>" +
            res.custom.name +
            "</span></span>" +
            "</p>" +
            "<p>" +
            '<span class="item"><span>楼号：</span><span>' +
            res.house.room_building +
            "</span></span>" +
            '<span class="item"><span>单元号：</span><span>' +
            res.house.room_danyuan +
            "</span></span>" +
            "</p>" +
            "<p>" +
            '<span class="item"><span>房号：</span><span>' +
            res.house.room_number +
            "</span></span>" +
            '<span class="item"><span>户型：</span><span>' +
            res.house.room_type +
            "</span></span>" +
            "</p>" +
            "<p>" +
            '<span class="item"><span>楼号选房面积：</span><span>' +
            res.house.room_area +
            "平米</span></span>" +
            '<span class="item"><span>总楼层：</span><span>' +
            res.house.room_max_floor +
            "</span></span>" +
            "</p>" +
            '<p><span class="item"><span>所在楼层：</span><span>' +
            res.house.room_floor +
            "" +
            "</span></span></p>" +
            "</div>" +
            "</div>" +
            '<div class="house_image">' +
            '<img src="' +
            res.house.img +
            '" alt="">' +
            "</div>";
          var confirmButton = document.querySelector(".confirm_button");
          var family_id = getUrlKey("family_id") || "";
          if (res.house.selected_custom_id === 0 && family_id) {
            confirmButton.style.display = "flex";
          }
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
  var params = jsonToParams({
    assign_batch_no: assign_batch_no,
    family_id: family_id,
    place: getUrlKey("place") || "",
    room_building: getUrlKey("room_building") || "",
    room_danyuan: getUrlKey("room_danyuan") || "",
    room_id: getUrlKey("room_id") || "",
    room_js: getUrlKey("room_js") || "",
    room_type: getUrlKey("room_type") || "",
    serial: serial,
  });
  location.href = "./project_list.html?" + params;
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  getResourceHouseData();
});
