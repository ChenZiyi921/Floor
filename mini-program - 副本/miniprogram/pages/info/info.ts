Page({
  data: {
    logs: [],
  },
  toRoomDetail() {
    wx.showLoading({
      title: "加载中",
    });
    wx.downloadFile({
      url: "https://www.klmxf.com/m/pdf/xfxz.pdf",
      success: (res) => {
        wx.hideLoading()
          if (res.tempFilePath) {
              wx.openDocument({
                  filePath: res.tempFilePath,
                  fail: (err) => {
                      console.error(err);
                  },
                  complete: () => {
                      wx.hideLoading();
                  }
              })
          }
      },
      fail: (err) => {
          console.error(err);
          wx.hideLoading();
      }
  })
  },
  toRoomDistribution() {
    wx.navigateTo({
      url: '../room_distribution/room_distribution',
    })
  },
  toRoomVideo() {
    wx.navigateTo({
      url: '../room_video/room_video',
    })
  },
  toRoomPosition() {
    wx.navigateTo({
      url: '../room_position/room_position',
    })
  },
  toRoomType() {
    wx.navigateTo({
      url: '../room_type/room_type',
    })
  },
  toRoomFlow() {
    wx.navigateTo({
      url: '../room_flow/room_flow',
    })
  },
  toRoomHandbook() {
    wx.showLoading({
      title: "加载中",
    });
    wx.downloadFile({
      url: "https://www.klmxf.com/m/pdf/xfsc.pdf",
      success: (res) => {
        wx.hideLoading()
          if (res.tempFilePath) {
              wx.openDocument({
                  filePath: res.tempFilePath,
                  fail: (err) => {
                      console.error(err);
                  },
                  complete: () => {
                      wx.hideLoading();
                  }
              })
          }
      },
      fail: (err) => {
          console.error(err);
          wx.hideLoading();
      }
  })
  },
  onLoad() {},
});
