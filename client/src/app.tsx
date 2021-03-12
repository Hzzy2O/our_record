import Taro, { Component,Config } from '@tarojs/taro'
import React from 'react';
import 'taro-ui/dist/style/index.scss'
import { Provider } from 'react-redux'
import dva from './utils/dva';
import Index from './pages/index/index'
import models from './models';

import './app.scss'
import "./assets/font/iconfont.css"

import Loading from "./components/loading"
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
class App extends React.Component {


  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env:'luv-diary-3gasftpi3ec96df4'
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}


export default App