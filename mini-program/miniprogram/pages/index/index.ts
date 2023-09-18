// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
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
