export default {
  pages: [
    'pages/index/index',
    'pages/project/project',
    'pages/info/info',
    'pages/room_distribution/room_distribution',
    'pages/room_video/room_video',
    'pages/room_position/room_position',
    'pages/room_type/room_type',
    'pages/room_flow/room_flow',
    'pages/room_handbook/room_handbook',
    'pages/unit_list/unit_list',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '昌平区“北四村”棚改项目安置房',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#7f8389',
    selectedColor: '#00a8f3',
    borderStyle: 'black',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/project/project',
        text: '项目概况',
        iconPath: 'img/tabbar/t-1.png',
        selectedIconPath: 'img/tabbar/t-1s.png',
      },
      {
        pagePath: 'pages/index/index',
        text: '主页',
        iconPath: 'img/tabbar/t-2.png',
        selectedIconPath: 'img/tabbar/t-2s.png',
      },
      {
        pagePath: 'pages/info/info',
        text: '信息公示',
        iconPath: 'img/tabbar/t-3.png',
        selectedIconPath: 'img/tabbar/t-3s.png',
      },
    ],
  },
  lazyCodeLoading: 'requiredComponents',
  style: 'v2',
  sitemapLocation: 'sitemap.json',
}
