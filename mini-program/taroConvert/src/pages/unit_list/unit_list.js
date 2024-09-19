import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp, { cacheOptions, getTarget } from '@tarojs/with-weapp'
import React from 'react'
import './unit_list.css'
// pages/unit_list/unit_list.ts
const app = Taro.getApp()
cacheOptions.setOptionsToCache({
  /**
   * 页面的初始数据
   */
  data: {
    place: '',
    building: '',
    active: '',
    units: ['一单元', '三单元', '二单元'],
    data: [],
  },
  getTabList() {
    Taro.getStorage({
      key: 'queryDy',
    }).then((res) => {
      const { place, building } = res.data
      Taro.request({
        url: app.globalData.host + '/api/wechat/queryDy',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          assign_batch_no: 1,
          place,
          building,
        },
        success: (res) => {
          this.setData({
            units: res.data.data,
            active: res.data.data[0],
          })
          this.getList(res.data.data[0])
        },
        fail: function (error) {
          console.error('请求出错:', error)
        },
      })
    })
  },
  init() {
    Taro.getStorage({
      key: 'queryDy',
    }).then((res) => {
      const { place, building } = res.data
      this.setData({
        place,
        building,
      })
    })
  },
  tabClick(e) {
    const { active } = getTarget(e.currentTarget, Taro).dataset
    this.setData({
      active,
    })
    this.getList(active)
  },
  getList(danYuan) {
    Taro.showLoading({
      title: '加载中',
    })
    Taro.request({
      url: app.globalData.host + '/api/wechat/queryRoom',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        assign_batch_no: 1,
        place: this.data.place,
        building: this.data.building,
        danYuan,
      },
      success: (res) => {
        this.setData({
          data: res.data.data,
        })
        Taro.hideLoading()
      },
      fail: function (error) {
        console.error('请求出错:', error)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.init()
    this.getTabList()
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
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const { units, active, place, building, data } = this.data
    return (
      <View className="container">
        <View className="tabs">
          {units.map((unit, index) => {
            return (
              <View
                onClick={this.tabClick}
                data-active={unit}
                className={'tab ' + (active === unit ? 'active' : '')}
              >
                {unit}
              </View>
            )
          })}
        </View>
        <View className="head">
          <View className="left">{place + ' - ' + building}</View>
          <View className="status_info">
            <View className="item">
              <Image
                className="image"
                src={require('../../img/checkbox.svg')}
              ></Image>
              <Text>可选</Text>
            </View>
            <View className="item">
              <Image
                className="image"
                src={require('../../img/checkbox_active.svg')}
              ></Image>
              <Text>已选</Text>
            </View>
          </View>
        </View>
        {data?.map((item, index) => {
          return (
            <View className="floor_info">
              <View className="room_floor">{item.room_floor}</View>
              {item.room.map((item, index) => {
                return (
                  <View
                    className={
                      'house ' + (item.selected === 0 ? 'unselect' : '')
                    }
                  >
                    <Image
                      className="image"
                      src={
                        item.selected === 0
                          ? '../../img/checkbox.svg'
                          : '../../img/checkbox_white.svg'
                      }
                    ></Image>
                    <View className="text">{item.room_number}</View>
                    <View className="status">
                      {item.selected === 0 ? '未选' : '已选'}
                    </View>
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  }
}
export default _C
