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
    description: "点击“确定”按钮，其视为确认选房结果，\n选房结果不可更改。",
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
            var params = jsonToParams({
              assign_batch_no: assign_batch_no,
              family_id: family_id,
              serial: serial,
            });

            layui.use(function(){
              var util = layui.util;
              // 自定义固定条
              /*util.fixbar({
                  bars: [{ // 定义可显示的 bar 列表信息 -- v2.8.0 新增
                      type: 'share',
                      icon: 'layui-icon-share'
                  }, {
                      type: 'help',
                      icon: 'layui-icon-help'
                  }, {
                      type: 'cart',
                      icon: 'layui-icon-cart',
                      style: 'background-color: #FF5722;'
                  }, {
                      type: 111,
                      id:'aaa',
                      content: 'D1-120平米',
                      style: 'font-size: 21px;width: 140px'
                  }],

                  // bar1: true,
                  // bar2: true,
                  // default: false, // 是否显示默认的 bar 列表 --  v2.8.0 新增
                  // bgcolor: '#393D52', // bar 的默认背景色
                   //css: {right: 100, bottom: 100},
                   css: {top: 150},
                  // target: '#target-test', // 插入 fixbar 节点的目标元素选择器
                  // duration: 300, // top bar 等动画时长（毫秒）
                  on: { // 任意事件 --  v2.8.0 新增
                      mouseenter: function(type){
                          layer.tips(type, this, {
                              tips: 4,
                              fixed: true
                          });
                      },
                      mouseleave: function(type){
                          layer.closeAll('tips');
                      }
                  },
                  // 点击事件
                  click: function(type){
                      console.log(this, type);
                      layer.msg(type);
                  }


              });*/

              function showFixbar(){
                $.ajax({
                  type: "post"
                  , url: global.base_url + "api/v10/getSelectedData"
                  , data: {family_id:family_id,serial:serial,assign_batch_no:assign_batch_no}
                  , dataType: "json"
                  , success: function (res) {
                    console.log(res);
                    if (res.status == 'success') {
                      //var options={'bars':res.bars};
                      //util.fixbar(options);


                      util.fixbar({
                        bars: res.bars,
                        // bar1: true,
                        // bar2: true,
                        // default: false, // 是否显示默认的 bar 列表 --  v2.8.0 新增
                        // bgcolor: '#393D52', // bar 的默认背景色
                        //css: {right: 100, bottom: 100},
                        css: {top: 150},
                        // target: '#target-test', // 插入 fixbar 节点的目标元素选择器
                        // duration: 300, // top bar 等动画时长（毫秒）
                        on: { // 任意事件 --  v2.8.0 新增
                          mouseenter: function(type){
                            layer.tips(type, this, {
                              tips: 4,
                              time: 20000, // 20s 后自动关闭
                              fixed: true
                            });
                          },
                          mouseleave: function(type){
                            layer.closeAll('tips');
                          }
                        },
                        // 点击事件
                        click: function(type){
                          // console.log(this, type);
                          //layer.msg(type);

                          if(type.indexOf("房确认单") > 0 ){
                            //选房确认单
                            layer.confirm("确定要打印选房确认单", {
                              title:"确认打印",
                              skin: '',
                              shade: .1
                            }, function (i) {
                              layer.close(i);

                              layer.open({
                                type: 2,
                                title: '打印流程单',
                                maxmin: false,
                                shadeClose: false, //点击遮罩关闭层
                                area : ['98%' , '98%'],
                                content: "/index/printlist/printConfirmation?assign_batch_no="+assign_batch_no+"&family_id="+family_id+"&serial="+serial
                              });

                            });

                          }else if(type.indexOf("轮流程单") > 0 ){
                            //第二轮选房通知单
                            layer.confirm("确定要打印第二轮流程单", {
                              title:"确认打印",
                              skin: '',
                              shade: .1
                            }, function (i) {
                              layer.close(i);

                              layer.open({
                                type: 2,
                                title: '打印第二轮流程单',
                                maxmin: false,
                                shadeClose: false, //点击遮罩关闭层
                                area : ['98%' , '98%'],
                                content: "/index/signin/printProcessTwo?transfer=1&id="+family_id+"&protocol_code="+serial
                              });

                            });
                          }else if(type.indexOf("验通知单") > 0 ){
                            //交验通知单
                            layer.confirm("确定要打印交验通知单", {
                              title:"确认打印",
                              skin: '',
                              shade: .1
                            }, function (i) {
                              layer.close(i);

                              layer.open({
                                type: 2,
                                title: '打印交验通知单',
                                maxmin: false,
                                shadeClose: false, //点击遮罩关闭层
                                area : ['98%' , '98%'],
                                content: "/index/printword/printConfirm?is_transfer=1&family_id="+family_id+"&serial="+serial
                              });

                            });

                          }
                        }
                      });
                    }
                    return false;
                  }
                });
              }

              showFixbar();
            });

            closePopup();
            popupMessage.innerHTML = res.msg;
            popup.classList.add("show");


            /*if(res.data.goto > 0){
              var myModal2 = new Modal({
                title: "特别提示",
                description: res.data.prompt,
                showButton1: true,
                button1Text: "选房完成",
                onButton1Click: function () {
                  myModal2.close();
                  location.href = "./last.html?" + params;
                },
                showButton2: true,
                button2Text: "继续选房",
                onButton2Click: function () {
                  location.href = "./project_list.html?" + params;
                },
              });
              myModal2.open();
            }else {
              var myModalNo = new Modal({
                title: "提示",
                description: res.data.prompt,
                showButton1: false,
                button1Text: "关闭",
                onButton1Click: function () {
                  myModalNo.close();
                  location.href = "";
                },
                showButton2: true,
                button2Text: "结算签约",
                onButton2Click: function () {
                  myModalNo.close();
                  location.href = "./last.html?" + params;//结算签约
                },
              });
              myModalNo.open();
            }*/
          }else {
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
