import React from "react"
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { globalData ,getNowDate ,getDayOfWeek } from "../../utils/common"
// @connect(({ newDinary }) => ({
//     ...newDinary,
// }))

class NewDinary extends React.Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    let {statusBarHeight,customBar} = globalData;
    const {year,month,date,day} = getNowDate();

    return (
      <View className='newDinary'>
          <View className='top_nav' style={`margin-top:${statusBarHeight}PX;height:${customBar}PX`}>
            <View className='iconfont iconchevrons-down' style='font-size:30PX;color:#000;'></View>
            <View className='mid_tit' >
              {`${getDayOfWeek(day)}. ${month}月 ${date} / ${year}`}
            </View>
            <View className='white' style='font-size:0PX;color:#000;'></View>
          </View>
      </View>
    )
  }
}

export default NewDinary
