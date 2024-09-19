import { Video, View } from '@tarojs/components'
import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import React from 'react'
import './room_video.css'
// pages/room_distribution/room_distribution.ts
cacheOptions.setOptionsToCache({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},
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
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    return (
      <View className="container">
        <View className="title">信息公示</View>
        <View className="item">
          <View className="label">选房流程动画</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <Video
          src="https://baikevideo.cdn.bcebos.com/media/mda-Ofj5DOML8EqV0Umy/da4f175769bcf693d0d0e205e1546015.mp4"
          poster="http://mmbiz.qpic.cn/mmbiz_jpg/EhZ0Apwc3PEeGtkWJyWbblIIRII9eLXQVibOHX3un9B2icSeoEp0BHxxlAib4ko6budbzYlfBuGp5ibA1TCXqSRwPg/0?wx_fmt=jpeg"
        ></Video>
      </View>
    )
  }
}
export default _C
