var assign_batch_no = getUrlKey("assign_batch_no") || "";
var family_id = getUrlKey("family_id") || "";
var serial = getUrlKey("serial") || "";
var place = getUrlKey("place_name") || "";
var room_js = getUrlKey("room_js") || "";
var room_type = getUrlKey("room_type") || "";

var options = {};
if (family_id) {
  options.family_id = family_id;
  options.serial = serial;
}
options.assign_batch_no = assign_batch_no;

var queryParams = {
  room_js: room_js,
  room_type: room_type,
};

// 进页面根据URL参数填充是第几轮
function init() {
  var container = document.querySelector(".container");
  var count = document.querySelector(".count");
  var room_detail = document.querySelector(".room_detail");
  var foot = document.querySelector(".foot");

  container.style.background =
    'url("./images/place/' + place + '_place.png") left top no-repeat';

  if (assign_batch_no) {
    count.innerHTML = "【第" + assign_batch_no + "轮选房】";
    count.style.display = "block";
  }

  room_detail.innerHTML = room_js + room_type;

  if (!family_id) {
    foot.style.display = "none";
  }
}

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
        var room_js = getUrlKey("room_js") || "";
        var room_type = getUrlKey("room_type") || "";
        var house_type_list = document.querySelector(".house_type_list");
        var house_type_list_html = "";

        for (var i = 0; i < res.data.length; i++) {
          var row_count = 0;
          var html = "";
          for (var j = 0; j < res.data[i].room_type.length; j++) {
            row_count = res.data[i].room_type.length / 3;
            html +=
              '<span class="room_type ' +
              (room_js === res.data[i].room_js &&
              room_type === res.data[i].room_type[j].room_type
                ? "active"
                : "") +
              '" room_js=' +
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
            '<span class="room_js' +
            (room_js === res.data[i].room_js ? " active" : "") +
            '" room_js="' +
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
      }
    },
  });
}

// 右侧那个列表
function area_list_render(room = {}) {
  $.ajax({
    type: "post",
    url: global.base_url + "api/v10/placeInfo",
    data: Object.assign({ place: place }, options, room),
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var area_list = document.querySelector(".area_list");
        var house_total = document.querySelector(".house_total");
        var place_items = document.querySelectorAll(".place_item");
        area_list.classList.add("place" + place);
        for (var i = 0; i < place_items.length; i++) {
          var html = "";
          place_items[i].style.display = "none";
          for (let j = 0; j < res.data.length; j++) {
            if (
              res.data[j].room_building ===
              place_items[i].getAttribute("room_building")
            ) {
              html +=
                "<p>" +
                res.data[j].room_building +
                "</p>" +
                "<p>剩余" +
                "<span style='color: #cb2020; font-size: 22px'>" +
                res.data[j].remain_total +
                "</span>" +
                "套</p>";
              place_items[i].innerHTML = html;
              place_items[i].style.display = "block";
            }
          }
        }
        house_total.innerHTML = res.total_count || 0;
        placeItemClick();
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

// 楼栋点击
function placeItemClick() {
  var place_item = document.querySelectorAll(".place_item");
  for (var i = 0; i < place_item.length; i++) {
    place_item[i].addEventListener("click", function () {
      var params = jsonToParams(
        Object.assign(
          {
            place: place,
            room_building: this.getAttribute("room_building") || "",
          },
          queryParams,
          options
        )
      );
      location.href = "./unit_info.html?" + params;
    });
  }
}

function to_back() {
  history.back();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  switchClick();
  house_type_list_render();
  area_list_render({ room_js: room_js, room_type: room_type });
});
