var myChart1;
function initChart1() {
    var chartDom = document.querySelector('.chart1');
    myChart1 = echarts.init(chartDom);
    var option;

    option = {
        grid: {
            left: 0
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                    normal: {
                        show: true,
                        position: 'center',
                        color: '#4c4a4a',
                        formatter: '{total|' + '75%' + '}' + '\n\r' + '{text|选房占比}',
                        rich: {
                            total: {
                                fontSize: 35,
                                fontFamily: "微软雅黑",
                                color: '#F86500',
                                lineHeight: 50,
                            },
                            text: {
                                fontFamily: "微软雅黑",
                                fontSize: 16,
                                color: '#fff',
                            },
                        }
                    },
                    emphasis: { // 中间文字显示
                        show: true,
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 250, name: 'Search Engine', itemStyle: {
                            normal: {
                                label: {
                                    formatter: "{c}" + "%",
                                    show: true,
                                    position: "inside",
                                    textStyle: {
                                        fontWeight: "bolder",
                                        fontSize: "12",
                                        color: "#fff"
                                    }
                                },
                                color: "#273f99",
                                opacity: 1
                            }
                        }
                    },
                    {
                        value: 735, name: 'Direct', itemStyle: {
                            normal: {
                                label: {
                                    formatter: "{c}" + "%",
                                    show: true,
                                    position: "inside",
                                    textStyle: {
                                        fontWeight: "bolder",
                                        fontSize: "12",
                                        color: "#fff"
                                    }
                                },
                                color: "#5dcae5",
                                opacity: 1
                            }
                        }
                    }
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
                                color: "#fff"
                            }
                        },
                        color: "#90d56f",
                        opacity: 1
                    }
                }
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
                        label: {
                            formatter: "共{c}" + "套",
                            show: true,
                            position: "top",
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "12",
                                color: "#fff"
                            }
                        },
                        color: "#263e99",
                        opacity: 1
                    }
                }
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
    for (let i = 0; i < 3; i++) {
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
                                color: "#fff"
                            }
                        },
                        color: "#f3b23e",
                        opacity: 1
                    }
                }
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
                        label: {
                            formatter: "共{c}" + "套",
                            show: true,
                            position: "top",
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "12",
                                color: "#fff"
                            }
                        },
                        color: "#263e99",
                        opacity: 1
                    }
                }
            },
        ],
    };

    option && myChart3.setOption(option);
}

function toQuery() {
    location.href = './project_list.html?assign_batch_no=1';
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
