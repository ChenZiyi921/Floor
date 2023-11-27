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
function returnFragment(danyuan, floor, sort) {
  // 15地块，7号楼
  if (
    place === "15" &&
    room_building === "7号楼" &&
    danyuan === "一单元" &&
    floor === "一层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (place === "08" && room_building === "2号楼") {
    return (
      "<tr>" +
      '<td class="number">三层</td>' +
      '<td class="item" rowspan="3"><div style="width: 500px;float: right;background: #dddddd;line-height: 86px;border: 2px solid #9cacdb;height: 270px; display: flex; justify-content: center; align-items: center;">社区管理服务用房</div></td>' +
      '<td class="item" rowspan="3"><div style="width: 500px;float: right;background: #dddddd;line-height: 86px;border: 2px solid #9cacdb;height: 270px; display: flex; justify-content: center; align-items: center;">社区管理服务用房</div></td>' +
      "</tr>" +
      "<tr>" +
      '<td class="number">二层</td>' +
      "</tr>" +
      "<tr>" +
      '<td class="number">一层</td>' +
      "</tr>"
    );
  }
  if (
    place === "08" &&
    room_building === "1号楼" &&
    danyuan === "二单元" &&
    floor === "二层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (place === "08" && room_building === "4号楼" && floor === "一层") {
    return "<div class='level' style='height: 90px'><p></p><p>南入户</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (
    place === "10" &&
    room_building === "2号楼" &&
    danyuan === "一单元" &&
    floor === "一层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区文化用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (
    place === "14" &&
    room_building === "2号楼" &&
    danyuan === "二单元" &&
    floor === "二层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区文化用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (
    place === "15" &&
    room_building === "6号楼" &&
    danyuan === 2 &&
    floor === "一层"
  ) {
    return "<div class='level' style='width: 252px; height: 90px'><p></p><p>物业用房</p><p style='visibility: hidden;'>3</p></div>";
  }
  if (place === "08" && room_building === "1号楼" && danyuan === 0) {
    if (floor === "一层" && sort === 1) {
      return "<div class='level' style='width: 252px; height: 90px; display: flex; justify-content: center; align-items: center; float: left; border-right: #ddd;'>商业服务菜市场</div>";
    }
    if (floor === "一层" && sort === 2) {
      return "<div class='level' style='width: 252px; height: 90px; border-left: #ddd;'><p></p><p></p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "二层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "三层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区卫生服务站</p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "四层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p>社区服务中心</p><p style='visibility: hidden;'>3</p><p style='position: absolute; left: 0; top: 0px; background: #ddd; width: 248px; height: 356px; z-index: 9; box-sizing: border-box; line-height: 30px; display: flex; justify-content: center; align-items: center;'>社区服务中心<br>社区卫生服务站<br>社区管理服务用房<br>商业服务菜市场<br>物业服务用房</p></div>";
    }
  }
  if (place === "14" && room_building === "2号楼" && danyuan === 0) {
    if (floor === "一层") {
      return "<div class='level' style='width: 378px; height: 90px; display: flex; justify-content: center; align-items: center; float: left;'>商业服务楼</div>";
    }
    if (floor === "二层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p></p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "三层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p></p><p style='visibility: hidden;'>3</p><p style='position: absolute; left: 0; bottom: -12px; background: #ddd; width: 244px; z-index: 9'>商业服务楼</p></div>";
    }
  }
  if (place === "14" && room_building === "3号楼" && danyuan === 0) {
    if (floor === "一层") {
      return "<div class='level' style='width: 504px; height: 90px; display: flex; justify-content: center; align-items: center; float: left;'>商业服务楼</div>";
    }
    if (floor === "二层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p></p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "三层") {
      return "<div class='level' style='width: 252px; height: 90px'><p></p><p></p><p style='visibility: hidden;'>3</p><p style='position: absolute; left: 0; bottom: -12px; background: #ddd; width: 244px; z-index: 9'>商业服务楼</p></div>";
    }
  }
  if (place === "14" && room_building === "4号楼" && danyuan === 0) {
    if (floor === "一层") {
      return "<div class='level' style='width: 378px; height: 90px; display: flex; justify-content: center; align-items: center; float: left;'>社区管理服务用房</div>";
    }
    if (floor === "二层") {
      return "<div class='level' style='width: 378px; height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
    }
    if (floor === "三层") {
      return "<div class='level' style='height: 90px'><p></p><p>社区管理服务用房</p><p style='visibility: hidden;'>3</p></div>";
    }
  }
  if (place === "14" && room_building === "7号楼" && danyuan === 0) {
    if (floor === "二层") {
      return "<div class='level' style='display: flex; align-items: center; justify-content: center; width: 126px; height: 180px; position: absolute; left: -126px;'><p></p><p>社区管理<br>服务用房</p><p style='visibility: hidden;'>3</p></div>";
    }
  }
  if (place === "14" && room_building === "8号楼" && danyuan === 0) {
    if (floor === "二层") {
      return "<div class='level' style='display: flex; align-items: center; justify-content: center; width: 126px; height: 180px; position: absolute; left: -126px;'><p></p><p>社区<br>服务用房</p><p style='visibility: hidden;'>3</p></div>";
    }
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
        var fragment1 = "";
        var fragment2 = "";
        var fragment4 = "";
        var fragment5 = "";
        var fragment7 = "";
        var fragment8 = "";
        var fragment9 = "";
        var fragment10 = "";
        var fragment11 = "";
        var fragment12 = "";
        var fragment13 = "";
        var fragment14 = "";
        var fragment15 = "";
        var fragment16 = "";
        var fragment17 = "";
        var fragment18 = "";
        var fragment19 = "";
        var fragment20 = "";
        var fragment21 = "";
        var fragment22 = "";
        var fragment23 = "";
        // 循环有多少楼层
        for (var i = 0; i < res.data.length; i++) {
          var itemHtml = "";
          // 循环有几个单元，供渲染户型使用
          for (var j = 0; j < res.data[i].room_danyua.length; j++) {
            var item = "";
            if (
              (place === "08" &&
                room_building === "5号楼" &&
                res.data[i].room_floor === "一层") ||
              (place === "08" &&
                room_building === "8号楼" &&
                res.data[i].room_floor === "一层")
            ) {
              res.data[i].room_danyua[j].room_info.splice(2, 0, {
                show: 10,
                room_number: "南入户",
              });
            }
            if (
              place === "08" &&
              room_building === "4号楼" &&
              res.data[i].room_floor === "一层"
            ) {
              res.data[i].room_danyua[j].room_info.splice(2, 0, {
                show: 10,
                room_number: "南入户",
              });
            }
            if (
              place === "10" &&
              room_building === "3号楼" &&
              res.data[i].room_floor === "一层"
            ) {
              if (j === 2) {
                res.data[i].room_danyua[j].room_info.splice(2, 0, {
                  show: 10,
                  room_number: "南入户",
                });
              } else {
                res.data[i].room_danyua[j].room_info.splice(1, 0, {
                  show: 10,
                  room_number: "南入户",
                });
              }
            }
            if (place === "14" && room_building === "7号楼") {
              // if (res.data[i].room_floor === "一层") {
              //   if (j === 0) {
              //     res.data[i].room_danyua[j].room_info.splice(0, 0, {
              //       show: 10,
              //       room_number: "服务用房",
              //     });
              //   }
              // }
              // if (res.data[i].room_floor === "二层") {
              //   if (j === 0) {
              //     res.data[i].room_danyua[j].room_info.splice(0, 0, {
              //       show: 10,
              //       room_number: "社区管理",
              //     });
              //   }
              // }
              fragment22 = returnFragment(j, res.data[i].room_floor, 1);
              // fragment22=returnFragment(j, res.data[i].room_floor, 1);
            }
            if (place === "14" && room_building === "8号楼") {
              // if (res.data[i].room_floor === "一层") {
              //   if (j === 0) {
              //     res.data[i].room_danyua[j].room_info.splice(0, 0, {
              //       show: 10,
              //       room_number: "服务用房",
              //     });
              //   }
              // }
              // if (res.data[i].room_floor === "二层") {
              //   if (j === 0) {
              //     res.data[i].room_danyua[j].room_info.splice(0, 0, {
              //       show: 10,
              //       room_number: "社区",
              //     });
              //   }
              // }
              fragment23 = returnFragment(j, res.data[i].room_floor, 1);
            }
            if (place === "15" && room_building === "6号楼") {
              if (res.data[i].room_floor === "一层") {
                if (j === 0) {
                  res.data[i].room_danyua[j].room_info.splice(0, 0, {
                    show: 10,
                    room_number: "社区管理用房",
                  });
                }
              }
              if (res.data[i].room_floor === "一层") {
                if (j === 0) {
                  res.data[i].room_danyua[j].room_info.splice(1, 0, {
                    show: 10,
                    room_number: "南入户",
                  });
                }
              }
              if (res.data[i].room_floor === "一层") {
                if (j === 1) {
                  res.data[i].room_danyua[j].room_info.splice(1, 0, {
                    show: 10,
                    room_number: "南入户",
                  });
                }
              }
              if (res.data[i].room_floor === "一层") {
                if (j === 2) {
                  res.data[i].room_danyua[j].room_info.splice(1, 0, {
                    show: 10,
                    room_number: "南入户",
                  });
                }
              }
            }
            if (place === "08" && room_building === "1号楼" && j === 0) {
              if (res.data[i].room_floor === "一层") {
                fragment11 = returnFragment(j, res.data[i].room_floor, 1);
                fragment12 = returnFragment(j, res.data[i].room_floor, 2);
              }
              if (res.data[i].room_floor === "二层") {
                fragment8 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "三层") {
                fragment9 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "四层") {
                fragment10 = returnFragment(j, res.data[i].room_floor);
              }
            }
            if (place === "14" && room_building === "2号楼" && j === 0) {
              if (res.data[i].room_floor === "一层") {
                fragment13 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "二层") {
                fragment14 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "三层") {
                fragment15 = returnFragment(j, res.data[i].room_floor);
              }
            }
            if (place === "14" && room_building === "3号楼" && j === 0) {
              if (res.data[i].room_floor === "一层") {
                fragment16 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "二层") {
                fragment17 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "三层") {
                fragment18 = returnFragment(j, res.data[i].room_floor);
              }
            }
            if (place === "14" && room_building === "4号楼" && j === 0) {
              if (res.data[i].room_floor === "一层") {
                fragment19 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "二层") {
                fragment20 = returnFragment(j, res.data[i].room_floor);
              }
              if (res.data[i].room_floor === "三层") {
                fragment21 = returnFragment(j, res.data[i].room_floor);
              }
            }
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
              if (
                place === "15" &&
                room_building === "7号楼" &&
                room_info.room_danyuan === "一单元" &&
                res.data[i].room_floor === "一层"
              ) {
                fragment1 = returnFragment(
                  room_info.room_danyuan,
                  res.data[i].room_floor
                );
              } else if (place === "08" && room_building === "2号楼") {
                fragment2 = returnFragment(
                  room_info.room_danyuan,
                  res.data[i].room_floor
                );
              } else if (
                place === "08" &&
                room_building === "1号楼" &&
                room_info.room_danyuan === "二单元" &&
                res.data[i].room_floor === "二层"
              ) {
              } else if (
                place === "10" &&
                room_building === "2号楼" &&
                room_info.room_danyuan === "一单元" &&
                res.data[i].room_floor === "一层"
              ) {
                fragment5 = returnFragment(
                  room_info.room_danyuan,
                  res.data[i].room_floor
                );
              } else if (
                place === "15" &&
                room_building === "6号楼" &&
                j === 2 &&
                res.data[i].room_floor === "一层"
              ) {
                fragment7 = returnFragment(j, res.data[i].room_floor);
              }

              item +=
                "<div style='height: 90px' room=" +
                roomParams +
                ' img="' +
                (room_info.img || "") +
                '" class="level ' +
                (room_info.show === 1 ? "level_item " : "") +
                "" +
                (room_info.selected_custom_id > 0 && room_info.show !== 0
                  ? "selected"
                  : "") +
                '">' +
                (room_info.show === 1
                  ? "<p>" +
                    (room_info.selected_custom_id > 0
                      ? '<span class="lock"><img src="./images/i_lock.png" alt=""></span>'
                      : "") +
                    room_info.room_number +
                    "</p>" +
                    "<p>" +
                    (room_info.room_js || "") +
                    (room_info.room_type || "") +
                    "</p>" +
                    "<p>" +
                    (room_info.room_area ? room_info.room_area + "㎡" : "") +
                    "</p>"
                  : room_info.show === 0
                  ? "<div style='visibility: hidden;'><p>1</p><p>2</p><p>3</p></div>"
                  : room_info.show === 10
                  ? "<div><p style='visibility: hidden;'>1</p><p>" +
                    room_info.room_number +
                    "</p><p style='visibility: hidden;'>3</p></div>"
                  : "") +
                "</div>";
            }
            itemHtml +=
              '<td class="item"><div style="display: inline-block; float: right; position: relative;">' +
              (j === 0 && res.data[i].room_floor === "一层"
                ? fragment11 + fragment12 + fragment13 + fragment16 + fragment19
                : "") +
              (j === 0 && res.data[i].room_floor === "二层"
                ? fragment8 +
                  fragment14 +
                  fragment17 +
                  fragment20 +
                  fragment22 +
                  fragment23
                : "") +
              (j === 0 && res.data[i].room_floor === "三层"
                ? fragment9 + fragment15 + fragment18 + fragment21
                : "") +
              (j === 0 && res.data[i].room_floor === "四层" ? fragment10 : "") +
              fragment4 +
              item +
              fragment1 +
              fragment5 +
              fragment7 +
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
        tbody.innerHTML = bodyHtml + fragment2;
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
