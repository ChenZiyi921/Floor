// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
    background: ["./img/banner1.png", "./img/banner1.png"],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    height: "",
    data: [
      {
        name: "0011地块",
        list: [
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
        ],
      },
      {
        name: "0011地块",
        list: [
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
        ],
      },
      {
        name: "0011地块",
        list: [
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
          { name: "01#" },
        ],
      },
    ],
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
    const { name } = e.currentTarget.dataset.params;
    wx.navigateTo({
      url: `../unit_list/unit_list?id=${name}`,
    });
  },
  onLoad() {
    this.getList();
  },
  getList() {
    wx.request({
      url: "http://cp.yxsdcti.cn/api/v10/selectedAnnouncement", // 请求的 URL
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        limit: 1000,
      },
      success: function (res) {
        console.log(res.data); // 处理返回的数据
      },
      fail: function (error) {
        console.error("请求出错:", error);
      },
    });
  },
});
