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
          initialTime={0}
          controls={true}
          autoplay={true}
          loop={false}
          muted={false}
        
          src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
          poster="https://h5.klmxf.com/poster.png"
        ></Video>
      </View>
    )
  }
}
export default _C
