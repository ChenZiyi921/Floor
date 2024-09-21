import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import withWeapp, { cacheOptions } from "@tarojs/with-weapp";
import React from "react";
import "./info.css";

cacheOptions.setOptionsToCache({
  data: {
    logs: [],
  },
  toRoomDistribution() {
    Taro.navigateTo({
      url: "../room_distribution/room_distribution",
    });
  },
  toRoomVideo() {
    Taro.navigateTo({
      url: "../room_video/room_video",
    });
  },
  toRoomPosition() {
    Taro.navigateTo({
      url: "../room_position/room_position",
    });
  },
  toRoomType() {
    Taro.navigateTo({
      url: "../room_type/room_type",
    });
  },
  toRoomFlow() {
    Taro.navigateTo({
      url: "../room_flow/room_flow",
    });
  },
  onLoad() {},
});
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfurl: `http://h5.klmxf.com/pdfjs/web/viewer.html?file=${encodeURIComponent(
        "http://h5.klmxf.com/xfxz.pdf"
      )}`, // 将 pdfurl 放入 state
    };
  }

  closePdfPreview = () => {
    this.setState({ pdfurl: "" }); // 更新 state
  };

  toRoomDetail = () => {
    this.setState({
      pdfurl: `http://h5.klmxf.com/pdfjs/web/viewer.html?file=${encodeURIComponent(
        "http://h5.klmxf.com/xfxz.pdf"
      )}`,
    });
  };

  toRoomHandbook = () => {
    this.setState({
      pdfurl: `http://h5.klmxf.com/pdfjs/web/viewer.html?file=${encodeURIComponent(
        "http://h5.klmxf.com/xfsc.pdf"
      )}`,
    });
  };
  render() {
    console.log(this.state.pdfurl);
    return (
      <View className="info_container">
        <View className="title">信息公示</View>
        <View className="item" onClick={this.toRoomDetail}>
          <View className="label">选房细则</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomDistribution}>
          <View className="label">居室分布示意图</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomVideo}>
          <View className="label">选房流程动画</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomPosition}>
          <View className="label">项目鸟瞰图</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomType}>
          <View className="label">户型信息</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomFlow}>
          <View className="label">选房流程</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        <View className="item" onClick={this.toRoomHandbook}>
          <View className="label">选房手册</View>
          <View className="date">2023/09/08 23:16:59</View>
        </View>
        {this.state.pdfurl ? (
          <View className="pdfPreview">
            <View
              onClick={this.closePdfPreview}
              style={{
                background: "#fff",
                textAlign: "right",
                paddingRight: 20,
              }}
            >
              ×
            </View>
            <iframe
              src={this.state.pdfurl}
              style={{ width: "100vw", height: "calc(100vh - 40px)" }}
            ></iframe>
          </View>
        ) : null}
      </View>
    );
  }
}
export default _C;
