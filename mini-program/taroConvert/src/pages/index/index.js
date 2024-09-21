import {
  Block,
  Image,
  Swiper,
  SwiperItem,
  Text,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import withWeapp, { cacheOptions, getTarget } from "@tarojs/with-weapp";
import React from "react";
import "../../global.css";
import "./index.css";
// index.ts
// 获取应用实例
const app = Taro.getApp();
cacheOptions.setOptionsToCache({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    height: "",
    data: [],
  },
  goheight(e) {
    var width = Taro.getSystemInfoSync().windowWidth;
    //获取可使用窗口宽度
    var imgheight = e.detail.height;
    //获取图片实际高度
    var imgwidth = e.detail.width;
    //获取图片实际宽度
    var height = (width * imgheight) / imgwidth + "px";
    //计算等比swiper高度
    this.setData({
      height: height,
    });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },
  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay,
    });
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value,
    });
  },
  toUnitList(e) {
    const { place, building } = getTarget(e.currentTarget, Taro).dataset;
    Taro.setStorage({
      data: {
        place,
        building,
      },
      key: "queryDy",
    });
    Taro.navigateTo({
      url: `../unit_list/unit_list`,
    });
  },
  onLoad() {
    this.getList();
  },
  getList() {
    Taro.request({
      url: app.globalData.host + "/api/wechat/placeFloor",
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        assign_batch_no: 1,
      },
      success: (res) => {
        const { data, status } = res.data;
        if (status === "success") {
          this.setData({
            data: data,
          });
        }
      },
      fail: function (error) {
        console.error("请求出错:", error);
      },
    });
  },
});
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const {
      indicatorDots,
      autoplay,
      circular,
      interval,
      duration,
      height,
      data,
    } = this.data;
    return (
      <View className="index_container">
        <Swiper
          indicatorDots={indicatorDots}
          autoplay={autoplay}
          circular={circular}
          interval={interval}
          duration={duration}
          style={{
            height: `${height}`,
          }}
        >
          <Block>
            <SwiperItem>
              <Image
                src="https://qlh.klmxf.com/m/wechat/banner/banner1.jpg"
                className="swiper-item"
                mode="widthFix"
                onLoad={this.goheight}
              ></Image>
            </SwiperItem>
            <SwiperItem>
              <Image
                src="https://qlh.klmxf.com/m/wechat/banner/banner2.jpg"
                className="swiper-item"
                mode="widthFix"
                onLoad={this.goheight}
              ></Image>
            </SwiperItem>
          </Block>
        </Swiper>
        {data?.map((item, index) => {
          return (
            <View className="item" key={index}>
              <View className="title">{item.place + "地块"}</View>
              <View className="block">
                {item.building.map((building, index) => {
                  return (
                    <View
                      key={index}
                      className="text"
                      onClick={this.toUnitList}
                      data-place={item.place}
                      data-building={building}
                    >
                      <Text>{building}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
export default _C;
