Page({
  data: {
    logs: [],
  },
  toRoomVideo() {
    wx.navigateTo({
      url: '../room_video/room_video',
    })
  },
  onLoad() {},
});
