// pages/room_type/room_type.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[
      'https://www.klmxf.com/m/wechat/js/1.jpg',         
      'https://www.klmxf.com/m/wechat/js/2.jpg',         
      'https://www.klmxf.com/m/wechat/js/3.jpg',         
      'https://www.klmxf.com/m/wechat/js/4.jpg',         
      'https://www.klmxf.com/m/wechat/js/5.jpg',         
      'https://www.klmxf.com/m/wechat/js/6.jpg',         
      'https://www.klmxf.com/m/wechat/js/7.jpg',         
      'https://www.klmxf.com/m/wechat/js/8.jpg',         
      'https://www.klmxf.com/m/wechat/js/9.jpg',         
      'https://www.klmxf.com/m/wechat/js/10.jpg',         
      'https://www.klmxf.com/m/wechat/js/11.jpg',         
      'https://www.klmxf.com/m/wechat/js/12.jpg',         
      'https://www.klmxf.com/m/wechat/js/13.jpg',         
      'https://www.klmxf.com/m/wechat/js/14.jpg',         
      'https://www.klmxf.com/m/wechat/js/15.jpg',         
      'https://www.klmxf.com/m/wechat/js/16.jpg',         
      'https://www.klmxf.com/m/wechat/js/17.jpg',         
      // 'https://www.klmxf.com/m/wechat/js/18.jpg',  
      ],
  },

  imgPreview:function(event: { currentTarget: { dataset: { src: any; list: any; }; }; })
  {
    var src = event.currentTarget.dataset.src;
    var imgList = event.currentTarget.dataset.list;
    wx.previewImage({
      current: src, 
      urls: imgList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})