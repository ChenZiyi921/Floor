// index.ts
// 获取应用实例
const app = getApp();

Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    height: "",
    data: [],
  },
  goheight(e) {
    var width = wx.getSystemInfoSync().windowWidth;
    //获取可使用窗口宽度
    var imgheight = e.detail.height;
    //获取图片实际高度
    var imgwidth = e.detail.width;
    //获取图片实际宽度
    var height = (width * imgheight) / imgwidth + "px";
    //计算等比swiper高度
    this.setData({
      height: height,
    });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay,
    });
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value,
    });
  },
  toUnitList(e) {
    const { place, building } = e.currentTarget.dataset;
    wx.setStorage({ data: { place, building }, key: "queryDy" });
    wx.navigateTo({
      url: `../unit_list/unit_list`,
    });
  },
  onLoad() {
    this.getList();
  },
  getList() {
    wx.request({
      url: app.globalData.host + "/api/wechat/placeFloor",
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        assign_batch_no: 1,
      },
      success: (res) => {
        const { data, status } = res.data;
        if (status === "success") {
          this.setData({ data: data });
        }
      },
      fail: function (error) {
        console.error("请求出错:", error);
      },
    });
  },
});
