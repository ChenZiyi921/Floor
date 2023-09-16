Page({
  data: {
    logs: [],
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
    wx.navigateTo({
      url: '../room_handbook/room_handbook',
    })
  },
  onLoad() {},
});
