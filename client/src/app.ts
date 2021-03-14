import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'

import './app.scss'
import "./assets/font/iconfont.css"
class App extends Component {

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
    return this.props.children
  }
}

export default App
