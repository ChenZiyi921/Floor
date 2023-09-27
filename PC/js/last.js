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

// 返回index.html, 查询页面
function toIndex() {
  var params = jsonToParams({
    assign_batch_no: assign_batch_no || "",
  });
  location.href = "./index.html?" + params;
}

function uncheck() {
  // 创建弹窗实例
  var myModal = new Modal({
    title: "特别提示",
    description: "确认后不可更改，是否确认",
    showButton1: true,
    button1Text: "取消",
    onButton1Click: function () {
      myModal.close();
    },
    showButton2: true,
    button2Text: "确定",
    onButton2Click: function () {
      $.ajax({
        url: global.base_url + "api/v10/endAll",
        type: "POST",
        data: {
          assign_batch_no: assign_batch_no,
          family_id: family_id,
          serial: serial,
        },
        dataType: "json",
        success: function (res) {
          if (res.status === "success") {
            toIndex();
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

function closeModal() {
  var popup_pdf = document.querySelector(".popup_pdf");
  popup_pdf.classList.remove("show");
}

function reQuery() {
  $.ajax({
    url: global.base_url + "api/v10/endSelect",
    type: "POST",
    data: {
      assign_batch_no: assign_batch_no,
      family_id: family_id,
      serial: serial,
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        toIndex();
      } else {
        closePopup();
        popupMessage.innerHTML = res.msg;
        popup.classList.add("show");
      }
    },
  });
}

function confirmSubmit() {
  $.ajax({
    url: global.base_url + "api/v10/endSelect",
    type: "POST",
    data: {
      assign_batch_no: assign_batch_no,
      family_id: family_id,
      serial: serial,
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var popup_pdf = document.querySelector(".popup_pdf");
        var popup_pdf_foot = document.querySelector(".popup_pdf_foot");
        var popup_pdf_message = document.querySelector(".popup_pdf_message");
        var pdf_url = document.querySelector(".pdf_url");
        pdf_url.setAttribute("src", res.print_url);
        if (res.next === 1) {
          popup_pdf_foot.style.display = "block";
        }
        popup_pdf_message.innerHTML = res.msg;
        popup_pdf.classList.add("show");
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

// 我要参加第二轮选房
function signSecond() {
  $.ajax({
    url: global.base_url + "api/v10/signSecond",
    type: "POST",
    data: {
      assign_batch_no: assign_batch_no,
      family_id: family_id,
      serial: serial,
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var popup_pdf = document.querySelector(".popup_pdf");
        var popup_pdf_foot = document.querySelector(".popup_pdf_foot");
        var popup_pdf_message = document.querySelector(".popup_pdf_message");
        var pdf_url = document.querySelector(".pdf_url");
        pdf_url.setAttribute("src", res.notice_print_url);
        popup_pdf_foot.style.display = "none";
        popup_pdf_message.innerHTML = res.msg;
        popup_pdf.classList.add("show");
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
