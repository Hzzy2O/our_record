import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text ,Canvas} from '@tarojs/components'
import lottie from 'lottie-miniprogram'
import './index.scss'
import animationData from "../../lotties/check.json"

export default class Index extends Component {

  componentWillMount () {
   }

  componentDidMount () { 
    
  }

  click(){
    Taro.createSelectorQuery().select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      canvas.width = 300//设置宽高，也可以放到wxml中的canvas标签的style中
      canvas.hight = 300
      lottie.setup(canvas)//要执行动画，必须调用setup,传入canvas对象
 
      lottie.loadAnimation({//微信小程序给的接口，调用就完事了，原理不太懂
        loop: true,//是否循环播放（选填）
        autoplay: true,//是否自动播放（选填）
        path:'https://assets1.lottiefiles.com/private_files/lf30_1rkyrmv9.json',//lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
        // animationData,
        rendererSettings:{
          context//es6语法：等同于context:context（必填）
        }       
      })
    }).exec()
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='index'>
        <text>123</text>
        <Canvas style='width: 300px; height: 200px;' canvasId='canvas' id='canvas' type='2d'/>
        <button onClick={this.click.bind(this)}>123</button>
        <View className='iconfont iconjihua' style='font-size:30PX;color:red;'></View>
      </View>
    )
  }
}
