var popup = document.querySelector(".popup");
var popupMessage = document.querySelector(".popup-message");

var place = getUrlKey("place") || "";
var room_building = getUrlKey("room_building") || "";
var assign_batch_no = getUrlKey("assign_batch_no") || "";
var family_id = getUrlKey("family_id") || "";
var serial = getUrlKey("serial") || "";

//mengfei
var room_js = getUrlKey("room_js") || "";
var room_type = getUrlKey("room_type") || "";

var options = {};
if (family_id) {
  options.family_id = family_id;
  options.serial = serial;
}
options.assign_batch_no = assign_batch_no;

// 进页面根据URL参数填充
function init() {
  var title = document.querySelector(".title");
  var house_info = document.querySelector(".house_info");
  var unitInfo = document.querySelector(".unitInfo");

  title.innerHTML =
    place +
    "地块：" +
    room_building +
    " （提示：点击房间查看户型；带锁图标为已选）";
  if (family_id) {
    house_info.style.display = "block";
    unitInfo.style.width = "calc(100vw - 370px)";
  }
}

function closePopup() {
  var popupClose = document.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });
}

function queryClick() {
  var level = document.querySelectorAll(".level_item");
  for (var i = 0; i < level.length; i++) {
    level[i].addEventListener("click", function () {
      for (let j = 0; j < level.length; j++) {
        level[j].classList.remove("active");
      }
      if (family_id) {
        var room = JSON.parse(this.getAttribute("room"));
        var params = jsonToParams({
          assign_batch_no: assign_batch_no,
          family_id: family_id,
          serial: serial,
          room_id: room.id || "",
          place: place,
          room_building: room_building,
          room_danyuan: room.room_danyuan || "",
          room_js: room.room_js || "",
          room_type: room.room_type || "",
        });
        location.href = "./detail.html?" + params;
      } else {
        this.classList.add("active");
        var house_image = document.querySelector(".house_image");
        house_image.style.display = "block";
        house_image.innerHTML =
          '<img src="' + this.getAttribute("img") + '" alt="">';
      }
    });
  }
}

// 不同地块单元样式不同
function returnFragment(danyuan, floor) {
  // 15地块，7号楼
  if (
    place === "15" &&
    room_building === "7号楼" &&
    danyuan === "一单元" &&
    floor === "一层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  return "";
}

// 查询
function buildingInfo() {
  $.ajax({
    url: global.base_url + "api/v10/buildingInfo",
    type: "GET",
    data: Object.assign(
      {
        place: place,
        room_building: room_building,
        room_js: room_js,
        room_type: room_type,
      },
      options
    ),
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        if (family_id) {
          var house_info = document.querySelector(".house_info");
          var selectedHtml = "";
          for (let s = 0; s < res.custom.selected_room.length; s++) {
            selectedHtml += res.custom.selected_room[s] + "\n";
          }
          house_info.innerHTML =
            "<p><span>选房序号：</span><span>" +
            res.custom.serial +
            "</span></p>" +
            "<p><span>被拆迁人：</span><span>" +
            res.custom.name +
            "</span></p>" +
            "<p><span>所选户型：</span><span>" +
            selectedHtml +
            "</span></p>";
        } else {
        }
        // 循环有几个单元，渲染thead
        var thead = document.querySelector(".thead");
        var haedHtml = "";
        for (var i = 0; i < res.danyuan.length; i++) {
          haedHtml += "<th>" + res.danyuan[i].room_danyuan + "</th>";
        }
        thead.innerHTML = "<tr>" + "<th>楼层\\单元</th>" + haedHtml + "</tr>";

        var tbody = document.querySelector(".tbody");
        var bodyHtml = "";
        var fragment = "";
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
              var roomParams = JSON.stringify({
                id: room_info.id,
                room_js: room_info.room_js,
                room_type: room_info.room_type,
                room_danyuan: room_info.room_danyuan,
              });
              fragment = returnFragment(
                room_info.room_danyuan,
                res.data[i].room_floor
              );
              item +=
                "<div style='height: 90px' room=" +
                roomParams +
                ' img="' +
                (room_info.img || "") +
                '" class="level ' +
                (room_info.show !== 0 ? "level_item " : "") +
                "" +
                (room_info.selected_custom_id > 0 && room_info.show !== 0
                  ? "selected"
                  : "") +
                '">' +
                (room_info.show !== 0
                  ? "<p>" +
                    (room_info.selected_custom_id > 0
                      ? '<span class="lock"><img src="./images/i_lock.png" alt=""></span>'
                      : "") +
                    room_info.room_number +
                    "</p>" +
                    "<p>" +
                    room_info.room_js +
                    room_info.room_type +
                    "</p>" +
                    "<p>" +
                    room_info.room_area +
                    "㎡</p>"
                  : "<div style='visibility: hidden;'><p>1</p><p>2</p><p>3</p></div>") +
                "</div>";
            }
            itemHtml +=
              '<td class="item"><div style="display: inline-block; float: right;">' +
              item +
              fragment +
              "</div></td>";
          }
          bodyHtml +=
            "<tr>" +
            "<td class='number'>" +
            res.data[i].room_floor +
            "</td>" +
            itemHtml +
            "</tr>";
        }
        tbody.innerHTML = bodyHtml;
        queryClick();
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
  buildingInfo();
});
