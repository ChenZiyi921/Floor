var assign_batch_no = getUrlKey("assign_batch_no") || "";
var myChart1;
function initChart1(data) {
  var ratio = Number(
    ((data.total_selected / data.total_room) * 100).toFixed(2)
  );
  var chartDom = document.querySelector(".chart1");
  myChart1 = echarts.init(chartDom);
  var option;

  option = {
    grid: {
      left: 0,
      bottom: 40,
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "选房占比",
        type: "pie",
        radius: ["65%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
          normal: {
            show: true,
            position: "center",
            color: "#4c4a4a",
            formatter:
              "{total|" + ratio + "%" + "}" + "\n\r" + "{text|选房占比}",
            rich: {
              total: {
                fontSize: 32,
                fontFamily: "微软雅黑",
                color: "#F86500",
                lineHeight: 50,
              },
              text: {
                fontFamily: "微软雅黑",
                fontSize: 16,
                color: "#c3d3ff",
              },
            },
          },
          emphasis: {
            // 中间文字显示
            show: true,
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: data.total_unselected,
            name: "未选",
            itemStyle: {
              normal: {
                label: {
                  formatter: "{c}" + "%",
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12",
                    color: "#fff",
                  },
                },
                color: "#273f99",
                opacity: 1,
              },
            },
          },
          {
            value: data.total_selected,
            name: "已选",
            itemStyle: {
              normal: {
                label: {
                  formatter: "{c}" + "%",
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12",
                    color: "#fff",
                  },
                },
                color: "#5dcae5",
                opacity: 1,
              },
            },
          },
        ],
      },
    ],
  };

  option && myChart1.setOption(option);
}

var myChart2;
function initChart2(data) {
  var chartDom = document.querySelector(".chart2");
  myChart2 = echarts.init(chartDom);
  var option;

  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  for (let i = 0; i < data.length; i++) {
    xAxisData.push(data[i].place_name);
    data1.push(Number(((data[i].selected / data[i].allRoom) * 100).toFixed(2)));
    data2.push(data[i].unselected);
    data3.push(data[i].allRoom);
  }
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  option = {
    legend: {
      data: ["已选", "未选"],
      left: "center",
      top: 14,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    toolbox: {},
    tooltip: {
      formatter: function (params) {
        return (
          "<div>" +
          "<p style='padding-bottom: 10px'>" +
          params.name +
          "</p>" +
          "<p>已选：" +
          data[params.dataIndex].selected +
          " 套</p>" +
          "<p>未选：" +
          data[params.dataIndex].unselected +
          " 套</p>" +
          "</div>"
        );
      },
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: "#8A9BC9",
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
        formatter: function (value, index) {
          return value + "套";
        },
      },
    },
    grid: {
      bottom: 40,
      right: 30,
    },
    series: [
      {
        name: "已选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: data1,
        barMaxWidth: 60,
        itemStyle: {
          normal: {
            label: {
              formatter: "{c}" + "%",
              show: true,
              position: "inside",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#e7a837",
            opacity: 1,
          },
        },
      },
      {
        name: "未选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        barMaxWidth: 60,
        data: data2,
        itemStyle: {
          normal: {
            // label: {
            //     formatter: "共{c}" + "套",
            //     show: true,
            //     position: "top",
            //     textStyle: {
            //         fontWeight: "bolder",
            //         fontSize: "12",
            //         color: "#fff"
            //     }
            // },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
      {
        name: "总数",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: new Array(data1.length).fill(2),
        itemStyle: {
          normal: {
            label: {
              formatter: (params) => {
                return "共" + data3[params.dataIndex] + "套";
              },
              show: true,
              position: "top",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
    ],
  };

  option && myChart2.setOption(option);
}

var myChart3;
function initChart3(data) {
  var chartDom = document.querySelector(".chart3");
  myChart3 = echarts.init(chartDom);
  var option;

  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  for (let i = 0; i < data.length; i++) {
    xAxisData.push(data[i].js_name);
    data1.push(Number(((data[i].selected / data[i].allRoom) * 100).toFixed(2)));
    data2.push(data[i].unselected);
    data3.push(data[i].allRoom);
  }
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  option = {
    legend: {
      data: ["已选", "未选"],
      right: 10,
      top: 12,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    toolbox: {},
    tooltip: {
      formatter: function (params) {
        return (
          "<div>" +
          "<p style='padding-bottom: 10px'>" +
          params.name +
          "</p>" +
          "<p>已选：" +
          data[params.dataIndex].selected +
          " 套</p>" +
          "<p>未选：" +
          data[params.dataIndex].unselected +
          " 套</p>" +
          "</div>"
        );
      },
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: "#8A9BC9",
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
        formatter: function (value, index) {
          return value + "套";
        },
      },
    },
    grid: {
      bottom: 40,
      right: 30,
      left: 60,
    },
    series: [
      {
        name: "已选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        barMaxWidth: 60,
        data: data1,
        itemStyle: {
          normal: {
            label: {
              formatter: "{c}" + "%",
              show: true,
              position: "inside",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#e7a837",
            opacity: 1,
          },
        },
      },
      {
        name: "未选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        barMaxWidth: 60,
        data: data2,
        itemStyle: {
          normal: {
            color: "#263e99",
            opacity: 1,
          },
        },
      },
      {
        name: "总数",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: new Array(data1.length).fill(2),
        itemStyle: {
          normal: {
            label: {
              formatter: (params) => {
                return "共" + data3[params.dataIndex] + "套";
              },
              show: true,
              position: "top",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
    ],
  };

  option && myChart3.setOption(option);
}

var myChart4;
function initChart4(data) {
  var chartDom = document.querySelector(".chart4");
  myChart4 = echarts.init(chartDom);
  var option;

  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  for (let i = 0; i < data.length; i++) {
    xAxisData.push(data[i].name);
    data1.push(Number(((data[i].selected / data[i].count) * 100).toFixed(2)));
    data2.push(data[i].count - data[i].selected);
    data3.push(data[i].count);
  }
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  option = {
    legend: {
      data: ["已选", "未选"],
      right: 10,
      top: 12,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    toolbox: {},
    tooltip: {
      formatter: function (params) {
        return (
          "<div>" +
          "<p style='padding-bottom: 10px'>" +
          params.name +
          "</p>" +
          "<p>已选：" +
          data[params.dataIndex].selected +
          " 套</p>" +
          "<p>未选：" +
          data[params.dataIndex].unselected +
          " 套</p>" +
          "</div>"
        );
      },
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: "#8A9BC9",
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLabel: {
        show: false,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
        formatter: function (value, index) {
          return value + "套";
        },
      },
    },
    grid: {
      bottom: 40,
      right: 30,
      right: 20,
      left: 20,
    },
    series: [
      {
        name: "已选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: data1,
        barMaxWidth: 60,
        itemStyle: {
          normal: {
            label: {
              formatter: "{c}" + "%",
              show: true,
              position: "inside",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#e7a837",
            opacity: 1,
          },
        },
      },
      {
        name: "未选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        barMaxWidth: 60,
        data: data2,
        itemStyle: {
          normal: {
            // label: {
            //     formatter: "共{c}" + "套",
            //     show: true,
            //     position: "top",
            //     textStyle: {
            //         fontWeight: "bolder",
            //         fontSize: "12",
            //         color: "#fff"
            //     }
            // },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
      {
        name: "总数",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: new Array(data1.length).fill(2),
        itemStyle: {
          normal: {
            label: {
              formatter: (params) => {
                return "共" + data3[params.dataIndex] + "套";
              },
              show: true,
              position: "top",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
    ],
  };

  option && myChart4.setOption(option);
}

var myChart5;
function initChart5(data) {
  var chartDom = document.querySelector(".today_family_list");
  myChart5 = echarts.init(chartDom);
  var option;

  let xAxisData = [];
  let data1 = [];
  let data2 = [];
  let data3 = [];
  for (let i = 0; i < data.length; i++) {
    xAxisData.push(data[i].name);
    data1.push(Number(((data[i].selected / data[i].count) * 100).toFixed(2)));
    data2.push(data[i].count - data[i].selected);
    data3.push(data[i].count);
  }
  var emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  option = {
    legend: {
      data: ["已选", "未选"],
      right: 10,
      top: 12,
      textStyle: {
        color: "#fff",
      },
      selectedMode: false,
    },
    toolbox: {},
    tooltip: {
      formatter: function (params) {
        return (
          "<div>" +
          "<p style='padding-bottom: 10px'>" +
          params.name +
          "</p>" +
          "<p>已选：" +
          data[params.dataIndex].selected +
          " 套</p>" +
          "<p>未选：" +
          data[params.dataIndex].unselected +
          " 套</p>" +
          "</div>"
        );
      },
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: "#8A9BC9",
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLabel: {
        show: false,
        textStyle: {
          color: "#8A9BC9",
          fontSize: 12,
          padding: 10,
        },
        formatter: function (value, index) {
          return value + "套";
        },
      },
    },
    grid: {
      bottom: 40,
      right: 30,
      right: 20,
      left: 20,
    },
    series: [
      {
        name: "已选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: data1,
        barMaxWidth: 60,
        itemStyle: {
          normal: {
            label: {
              formatter: "{c}" + "%",
              // formatter: "{c}户",
              show: true,
              position: "inside",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#e7a837",
            opacity: 1,
          },
        },
      },
      {
        name: "未选",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        barMaxWidth: 60,
        data: data2,
        itemStyle: {
          normal: {
            // label: {
            //     formatter: "共{c}" + "套",
            //     show: true,
            //     position: "top",
            //     textStyle: {
            //         fontWeight: "bolder",
            //         fontSize: "12",
            //         color: "#fff"
            //     }
            // },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
      {
        name: "总数",
        type: "bar",
        stack: "one",
        emphasis: emphasisStyle,
        data: new Array(data1.length).fill(2),
        itemStyle: {
          normal: {
            label: {
              formatter: (params) => {
                return "共" + data3[params.dataIndex] + "户";
              },
              show: true,
              position: "top",
              textStyle: {
                fontWeight: "bolder",
                fontSize: "12",
                color: "#fff",
              },
            },
            color: "#263e99",
            opacity: 1,
          },
        },
      },
    ],
  };

  option && myChart5.setOption(option);
}

function bigScreen() {
  $.ajax({
    url: global.base_url + "api/v10/bigScreen",
    type: "POST",
    data: {
      assign_batch_no: assign_batch_no,
    },
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        var today_date = document.querySelector(".today_date");
        today_date.innerHTML = res.data.today_date + " " + res.data.today_week;

        if (res.data.placeData && res.data.placeData.length) {
          var left = document.querySelector(".content");
          var placeDataHtml = "";
          for (let i = 0; i < res.data.placeData.length; i++) {
            placeDataHtml +=
              '<div class="item" style="background: url(' +
              res.data.placeData[i].image +
              ') center center no-repeat">' +
              "<p>" +
              res.data.placeData[i].place_name +
              "</p>" +
              "<p>剩余" +
              res.data.placeData[i].unselected +
              "套</p>" +
              "<p>已选" +
              res.data.placeData[i].selected +
              "套</p>" +
              "</div>";
          }
          left.innerHTML = placeDataHtml;
        }

        var count = document.querySelector(".count");
        count.innerHTML = res.data.todayData.todaySelected;

        if (res.data.todayFamily) {
          var familyCount = document.querySelector(".familyCount");
          familyCount.innerHTML = res.data.todayFamily.familyCount;
          // var js_content = document.querySelector(".js_content");
          // var js_content_li = "";
          // for (let li = 0; li < res.data.todayFamily.sedS.length; li++) {
          //   const item = res.data.todayFamily.sedS[li];
          //   js_content_li +=
          //     "<li>" +
          //     "<strong>" +
          //     item.count +
          //     "</strong>" +
          //     "<span>" +
          //     item.room_js +
          //     "</span>" +
          //     "</li>";
          // }
          // js_content.innerHTML = js_content_li;
        }

        // if (
        //   res.data.todayFamily.familyInfo &&
        //   res.data.todayFamily.familyInfo.length
        // ) {
        //   var today_family_list = document.querySelector(".today_family_list");
        //   if (today_family_list) {
        //     var today_family_html = "";
        //     for (let li = 0; li < 5; li++) {
        //       today_family_html +=
        //         "<li>" + (res.data.todayFamily.familyInfo[li] || "") + "</li>";
        //     }
        //     today_family_list.innerHTML = today_family_html;
        //   }
        // }

        initChart1(res.data.todayData);
        initChart2(res.data.selectionPlace);
        initChart3(res.data.jsData);
        initChart4(res.data.village);
        initChart5(res.data.village);
      }
    },
  });
}

function toQuery() {
  location.href = "./project_list.html?assign_batch_no=" + assign_batch_no;
}

document.addEventListener("DOMContentLoaded", function () {
  bigScreen();
  var timer;
  function doSomething() {
    bigScreen();
    clearTimeout(timer);
    timer = setTimeout(doSomething, 1000 * 5);
  }
  // timer = setTimeout(doSomething, 1000 * 5); // 五秒钟
});

window.addEventListener("resize", () => {
  myChart1.resize();
  myChart2.resize();
  myChart3.resize();
  myChart4.resize();
  myChart5.resize();
});
