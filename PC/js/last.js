var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

var assign_batch_no = getUrlKey("assign_batch_no") || "";
var family_id = getUrlKey("family_id") || "";
var serial = getUrlKey("serial") || "";

function init() {
  endQuery();
}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

function reQuery() {
  // 返回index.html, 查询页面
  var params = jsonToParams({
    assign_batch_no: assign_batch_no || "",
  });
  location.href = "./index.html?" + params;
}

function confirmSubmit() {
  $.ajax({
    url: global.base_url + "api/v10/selectionComplete",
    type: "POST",
    data: {
      // assign_batch_no: getUrlKey("assign_batch_no") || "",
      // family_id: getUrlKey("family_id") || "",
      // serial: getUrlKey("serial") || "",
      // room_id: getUrlKey("room_id") || "",
      // place: getUrlKey("place") || "",
      // room_building: getUrlKey("room_building") || "",
      // room_danyuan: getUrlKey("room_danyuan") || "",
      // room_js: getUrlKey("room_js") || "",
      // room_type: getUrlKey("room_type") || "",
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        // var myModal = new Modal({
        //   title: "特别提示",
        //   description: "剩余面积139平示。是否继续选房",
        //   showButton1: true,
        //   button1Text: "结算签约",
        //   onButton1Click: function () {
        //     myModal.close();
        //     to_index();
        //   },
        //   showButton2: true,
        //   button2Text: "继续选房",
        //   onButton2Click: function () {
        //     var params = jsonToParams({
        //       assign_batch_no: assign_batch_no,
        //       family_id: family_id || "",
        //       serial: serial || "",
        //     });
        //     location.href = "./project_list.html?" + params;
        //   },
        // });
      } else {
        closePopup();
        popupMessage.innerHTML = res.msg;
        popup.classList.add("show");
      }
    },
  });
}

// 查询
function endQuery(val) {
  $.ajax({
    url: global.base_url + "api/v10/endQuery",
    type: "GET",
    data: {
      serial: serial,
      family_id: family_id,
      assign_batch_no: assign_batch_no,
    },
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        if (res.data) {
          var detail = document.querySelector(".detail");
          detail.innerHTML =
            '<p><span class="left">选房序号：</span><span class="right">' +
            res.data.serial +
            "</span></p>" +
            '<p><span class="left">被腾退人：</span><span class="right">' +
            res.data.name +
            "</span></p>" +
            '<p><span class="left">身份证号码：</span><span class="right">' +
            res.data.id_card +
            "</span></p>" +
            '<p><span class="left">应安置面积：</span><span class="right">' +
            res.data.area_zuizhong +
            "</span></p>" +
            '<p><span class="left">已选房屋：</span><span class="right">' +
            res.data.selected_room.join().replaceAll(",", "\n") +
            "</span></p>" +
            '<p><span class="left">剩余面积：</span><span class="right">' +
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

document.addEventListener("DOMContentLoaded", function () {
  init();
});
