import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp, { cacheOptions, getTarget } from '@tarojs/with-weapp'
import React from 'react'
import './room_type.css'
// pages/room_type/room_type.ts
cacheOptions.setOptionsToCache({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      'https://qlh.klmxf.com/m/wechat/js/1.jpg',
      'https://qlh.klmxf.com/m/wechat/js/2.jpg',
      'https://qlh.klmxf.com/m/wechat/js/3.jpg',
      'https://qlh.klmxf.com/m/wechat/js/4.jpg',
      'https://qlh.klmxf.com/m/wechat/js/5.jpg',
      'https://qlh.klmxf.com/m/wechat/js/6.jpg',
      'https://qlh.klmxf.com/m/wechat/js/7.jpg',
      'https://qlh.klmxf.com/m/wechat/js/8.jpg',
      'https://qlh.klmxf.com/m/wechat/js/9.jpg',
      'https://qlh.klmxf.com/m/wechat/js/10.jpg',
      'https://qlh.klmxf.com/m/wechat/js/11.jpg',
      'https://qlh.klmxf.com/m/wechat/js/12.jpg',
      'https://qlh.klmxf.com/m/wechat/js/13.jpg',
      'https://qlh.klmxf.com/m/wechat/js/14.jpg',
      'https://qlh.klmxf.com/m/wechat/js/15.jpg',
      'https://qlh.klmxf.com/m/wechat/js/16.jpg',
      'https://qlh.klmxf.com/m/wechat/js/17.jpg',
      // 'https://qlh.klmxf.com/m/wechat/js/18.jpg',
    ],
  },
  imgPreview: function (event) {
    var src = getTarget(event.currentTarget, Taro).dataset.src
    var imgList = getTarget(event.currentTarget, Taro).dataset.list
    Taro.previewImage({
      current: src,
      urls: imgList,
    })
  },
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
    const { imgList } = this.data
    return (
      <View className="container">
        <View className="title">信息公示</View>
        <View className="item">
          <View className="label">户型信息</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        {imgList.map((item, index) => {
          return (
            <View>
              <Image
                className="image"
                key={index}
                src={item}
                data-src={item}
                mode="widthFix"
                data-list={imgList}
                onClick={this.imgPreview}
                style={{
                  marginTop: '0.6rem',
                }}
              ></Image>
            </View>
          )
        })}
      </View>
    )
  }
}
export default _C
