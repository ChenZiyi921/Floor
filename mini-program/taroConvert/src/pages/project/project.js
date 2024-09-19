import { Image, View } from '@tarojs/components'
import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import React from 'react'
import './project.css'
cacheOptions.setOptionsToCache({
  data: {
    logs: [],
  },
  onLoad() {},
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    return (
      <View className="container">
        <View className="item">
          <View className="title">项目鸟瞰图</View>
          <View className="block">
            <Image
              className="image"
              src="https://www.klmxf.com/m/wechat/01.jpg"
              mode="widthFix"
            ></Image>
            {/*  <image class="image" src="../../img/2.jpg" mode="widthFix" />  */}
          </View>
        </View>
        <View className="item">
          <View className="title">选房周期</View>
          <View
            className="block"
            style={{
              padding: '0.75rem 0.4rem',
            }}
          >
            <View className="h5">第一轮时间：待定</View>
            <View className="h5">第二轮时间：待定</View>
            <View className="h5">第二轮时间：待定</View>
            <View className="h6">具体选房时间以《选房通知单》注明时间为准</View>
          </View>
        </View>
        <View className="item">
          <View className="title">选房大厅地址</View>
          <View className="block">
            <View className="text">选房场地为：昌平区农学院东路</View>
            <Image
              className="image"
              src="https://www.klmxf.com/m/wechat/02.png"
              mode="widthFix"
            ></Image>
            <Image
              className="image"
              src="https://www.klmxf.com/m/wechat/03.jpg"
              mode="widthFix"
            ></Image>
          </View>
        </View>
        <View className="item">
          <View className="title">选房大厅动向安排</View>
          <View className="block">
            <Image
              className="image"
              src="https://www.klmxf.com/m/wechat/04.jpg"
              mode="widthFix"
            ></Image>
            <Image
              className="image"
              src="https://www.klmxf.com/m/wechat/05.png"
              mode="widthFix"
            ></Image>
          </View>
        </View>
      </View>
    )
  }
}
export default _C
