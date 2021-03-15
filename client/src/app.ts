import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'

import './app.scss'
import "./assets/font/iconfont.css"

import {globalData} from "./utils/common"
const {windowWidth,windowHeight} = Taro.getSystemInfoSync()
class App extends Component {
  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      globalData.windowHeight = windowHeight;
      globalData.windowWidth = windowWidth;
      
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
    return this.props.children
  }
}

export default App
