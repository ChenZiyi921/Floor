// pages/unit_list/unit_list.ts
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    place: "",
    building: "",
    active: "",
    units: ["一单元", "三单元", "二单元"],
    data: [],
  },
  getTabList() {
    wx.getStorage({
      key: "queryDy",
    }).then((res) => {
      const { place, building } = res.data;
      wx.request({
        url: app.globalData.host + "/api/wechat/queryDy",
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
        data: {
          assign_batch_no: 1,
          place,
          building,
        },
        success: (res) => {
          this.setData({ units: res.data.data, active: res.data.data[0] });
          this.getList(res.data.data[0]);
        },
        fail: function (error) {
          console.error("请求出错:", error);
        },
      });
    });
  },
  init() {
    wx.getStorage({
      key: "queryDy",
    }).then((res) => {
      const { place, building } = res.data;
      this.setData({ place, building });
    });
  },
  tabClick(e) {
    const { active } = e.currentTarget.dataset;
    this.setData({ active });
    this.getList(active);
  },
  getList(danYuan) {
    wx.showLoading({
      title: "加载中",
    });
    wx.request({
      url: app.globalData.host + "/api/wechat/queryRoom",
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        assign_batch_no: 1,
        place: this.data.place,
        building: this.data.building,
        danYuan,
      },
      success: (res) => {
        this.setData({ data: res.data.data });
        wx.hideLoading();
      },
      fail: function (error) {
        console.error("请求出错:", error);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.init();
    this.getTabList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
