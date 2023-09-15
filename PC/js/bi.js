var myChart1;
function initChart1() {
    var chartDom = document.querySelector('.chart1');
    myChart1 = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' }
                ]
            }
        ]
    };

    option && myChart1.setOption(option);
}

var myChart2;
function initChart2() {
    var chartDom = document.querySelector(".chart2");
    myChart2 = echarts.init(chartDom);
    var option;

    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    for (let i = 0; i < 6; i++) {
        xAxisData.push("Class" + i);
        data1.push(+(Math.random() * 2).toFixed(2));
        data2.push(+(Math.random() * 5).toFixed(2));
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
                color: '#fff'
            },
            selectedMode: false
        },
        toolbox: {},
        tooltip: {},
        xAxis: {
            data: xAxisData,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#8A9BC9',
                    fontSize: 12,
                    padding: 10,
                },
            },
        },
        yAxis: {
            splitLine: { show: false },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#8A9BC9',
                    fontSize: 12,
                    padding: 10,
                },
                formatter: function (value, index) {
                    return value + '套';
                }
            },
        },
        grid: {
            bottom: 40,
            right: 30
        },
        series: [
            {
                name: "已选",
                type: "bar",
                stack: "one",
                emphasis: emphasisStyle,
                data: data1,
            },
            {
                name: "未选",
                type: "bar",
                stack: "one",
                emphasis: emphasisStyle,
                data: data2,
            },
        ],
    };

    option && myChart2.setOption(option);
}

var myChart3;
function initChart3() {
    var chartDom = document.querySelector(".chart3");
    myChart3 = echarts.init(chartDom);
    var option;

    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    for (let i = 0; i < 6; i++) {
        xAxisData.push("Class" + i);
        data1.push(+(Math.random() * 2).toFixed(2));
        data2.push(+(Math.random() * 5).toFixed(2));
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
                color: '#fff'
            },
            selectedMode: false
        },
        toolbox: {},
        tooltip: {},
        xAxis: {
            data: xAxisData,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#8A9BC9',
                    fontSize: 12,
                    padding: 10,
                },
            },
        },
        yAxis: {
            splitLine: { show: false },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#8A9BC9',
                    fontSize: 12,
                    padding: 10,
                },
                formatter: function (value, index) {
                    return value + '套';
                }
            },
        },
        grid: {
            bottom: 40,
            right: 30
        },
        series: [
            {
                name: "已选",
                type: "bar",
                stack: "one",
                emphasis: emphasisStyle,
                data: data1,
            },
            {
                name: "未选",
                type: "bar",
                stack: "one",
                emphasis: emphasisStyle,
                data: data2,
            },
        ],
    };

    option && myChart3.setOption(option);
}

document.addEventListener("DOMContentLoaded", function () {
    initChart1();
    initChart2();
    initChart3();
});


window.addEventListener('resize', () => {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
})
