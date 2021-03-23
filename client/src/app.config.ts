export default {
  pages: [
    'pages/index/index',
    'pages/diary/index',
    'pages/diaryList/index',
    'pages/entry/index',
    'pages/newDiary/index',
    'pages/daysMatter/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle:"custom"
  },
  tabBar: {
    // 使用custom-tab-bar
    custom: true,
    color: 'rgba(0, 0, 0, 0.6)',
    selectedColor: 'rgba(0, 162, 0, 1)',
    backgroundColor: '#fff',
    borderStyle: 'white',
    // 这些配置无法省略 同时需要注意pagePath和图片路径的配置
    // 如果这里图片路径没有配置或配置出错的话，图片icon不会显示
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/home.png',
        selectedIconPath: './assets/home_foc.png',
      },
      {
        pagePath:  'pages/newDiary/index',
        text: '分类',
        iconPath: './assets/add.png',
        selectedIconPath: './assets/add.png',
      },
      {
        pagePath: 'pages/daysMatter/index',
        text: '我的',
        iconPath: './assets/my.png',
        selectedIconPath: './assets/my_foc.png',
      },
    ],
  },
  cloud: true
}
