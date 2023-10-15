var queryParams = {};
var assign_batch_no = getUrlKey("assign_batch_no") || "";
var family_id = getUrlKey("family_id") || "";
var serial = getUrlKey("serial") || "";

var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

var options = {};
if (family_id) {
  options.family_id = family_id;
  options.serial = serial;
}
options.assign_batch_no = assign_batch_no;

// 进页面根据URL参数填充是第几轮
function init() {
  var count = document.querySelector(".count");
  var search = document.querySelector(".search");
  var input = document.querySelector(".input");
  var foot = document.querySelector(".foot");

  if (assign_batch_no) {
    count.innerHTML = "【第" + assign_batch_no + "轮选房】";
    count.style.display = "block";
  }
  if (!family_id) {
    search.style.visibility = "hidden";
    foot.style.display = "none";
  } else {
    input.value = serial;
  }
}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

// swich 开关
function switchClick() {
  var slide = document.querySelector(".slide");
  var switch_open = document.querySelector(".switch_open");
  var switch_close = document.querySelector(".switch_close");
  switch_open.addEventListener("click", function () {
    this.style.display = "none";
    switch_close.style.display = "block";
    slide.style.height = "132px";
  });
  switch_close.addEventListener("click", function () {
    this.style.display = "none";
    switch_open.style.display = "block";
    slide.style.height = "";
  });
}

// 左侧那个列表
function house_type_list_render() {
  $.ajax({
    url: global.base_url + "api/v10/roomType",
    type: "GET",
    data: options,
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var house_type_list = document.querySelector(".house_type_list");
        var house_type_list_html = "";

        for (var i = 0; i < res.data.length; i++) {
          var row_count = 0;
          var html = "";
          for (var j = 0; j < res.data[i].room_type.length; j++) {
            row_count = res.data[i].room_type.length / 3;
            html +=
              '<span class="room_type" room_js=' +
              res.data[i].room_js +
              " room_type=" +
              res.data[i].room_type[j].room_type +
              ">" +
              res.data[i].room_type[j].room_type +
              "-" +
              Number(res.data[i].room_type[j].room_area) +
              "</span>";
          }

          var fill_html = "";
          for (let k = 0; k < Math.ceil(row_count) - 1; k++) {
            fill_html += "<span></span>";
          }

          house_type_list_html +=
            '<div class="house_type">' +
            '<div class="left">' +
            '<span class="room_js" room_js="' +
            res.data[i].room_js +
            '">' +
            res.data[i].room_js +
            "</span>" +
            fill_html +
            "</div>" +
            '<div class="right">' +
            html +
            "</div>" +
            "</div>";
        }
        house_type_list.innerHTML = house_type_list_html;
        queryPlaceJs();
        queryPlaceHouse();

        //mengfei
        //主选时显示已选房源
        for (var i = 0; i < res.selectedData.length; i++) {
          $("#foot").append(
            '<p><span class="room_detail">' +
              res.selectedData[i].house +
              "</span><span>" +
              res.selectedData[i].number +
              "</span></p>"
          );
        }

        var btn_confirm = document.querySelector(".btn_confirm");
        // 主选并且选房了
        if (family_id && res.selectedData.length) {
          /*btn_confirm.style.display = "flex";
          var params = jsonToParams({
            assign_batch_no: assign_batch_no,
            family_id: family_id,
            serial: serial,
          });
          btn_confirm.style.display = "flex";
          btn_confirm.addEventListener("click", function () {
            location.href = "./last.html?" + params;
          });*/
        } else {
          //btn_confirm.style.display = "none";

          //预选
          btn_confirm.style.display = "flex";
          var params = jsonToParams({
            assign_batch_no: assign_batch_no,
          });
          btn_confirm.style.display = "flex";
          btn_confirm.addEventListener("click", function () {
            location.href = "./bi.html?" + params;
          });
        }
      }
    },
  });
}

// 右侧那个列表
function area_list_render(room = {}) {
  $.ajax({
    type: "post",
    url: global.base_url + "api/v10/queryPlace",
    data: Object.assign(room, options),
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var area_list = document.querySelector(".area_list");
        var house_total = document.querySelector(".house_total");
        var area_list_html = "";
        for (var i = 0; i < res.data.length; i++) {
          area_list_html +=
            '<div class="item" place_name="' +
            res.data[i].place_name +
            '">' +
            '<img src="' +
            res.data[i].image +
            '" alt="">' +
            '<div class="info">' +
            '<div class="title">' +
            res.data[i].place_name +
            "地块</div>" +
            '<div class="count">' +
            res.data[i].total +
            "</div>" +
            "</div>" +
            "</div>";
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
  var house_type_list = document.querySelector(".house_type_list");
  var items = house_type_list.querySelectorAll(".room_js");

  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
}

// 清空户型选中样式
function clearRoomTypeClass() {
  var house_type_list = document.querySelector(".house_type_list");
  var items = house_type_list.querySelectorAll(".room_type");

  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }
}

// 居室点击事件
function queryPlaceJs() {
  var house_type_list = document.querySelector(".house_type_list");
  var items = house_type_list.querySelectorAll(".room_js");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }
      this.classList.add("active");
      clearRoomTypeClass();
      var room_js = this.getAttribute("room_js");
      queryParams = { room_js: room_js };
      area_list_render({ room_js: room_js });

      //mengfei
      /*var room_detail = document.querySelector(".room_detail");
            room_detail.innerHTML = room_js;*/
    });
  }
}

// 户型点击事件
function queryPlaceHouse() {
  var house_type_list = document.querySelector(".house_type_list");
  var items = house_type_list.querySelectorAll(".room_type");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }
      clearRoomJsClass();
      this.classList.add("active");
      this.parentNode.parentNode
        .querySelector(".left")
        .querySelector("span")
        .classList.add("active");
      var room_js = this.getAttribute("room_js");
      var room_type = this.getAttribute("room_type");
      queryParams = { room_js: room_js, room_type: room_type };
      area_list_render({ room_js: room_js, room_type: room_type });

      //mengfei
      /*var room_detail = document.querySelector(".room_detail");
            room_detail.innerHTML = room_js + room_type;*/
    });
  }
}

// 跳转区域房源详情
function queryPlace() {
  var area_list = document.querySelector(".area_list");
  var items = area_list.querySelectorAll(".item");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      var isActive = document.querySelectorAll(".active");
      if (isActive.length) {
        var params = jsonToParams(
          Object.assign({}, queryParams, options, {
            assign_batch_no: assign_batch_no || "",
            place_name: this.getAttribute("place_name") || "",
          })
        );
        location.href = "./area.html?" + params;
      } else {
        closePopup();
        popupMessage.innerHTML = "请选择居室或者户型";
        popup.classList.add("show");
      }
    });
  }
}

// 返回index.html, 查询页面
function to_index() {
  var params = jsonToParams({
    assign_batch_no: assign_batch_no || "",
  });
  location.href = "./index.html?" + params;
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  switchClick();
  house_type_list_render();
  area_list_render();
});
