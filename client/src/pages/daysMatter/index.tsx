import React from "react"
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import Loading from "../../components/loading/index.weapp"

// @connect(({ daysMatter }) => ({
//     ...daysMatter,
// }))

class DaysMatter extends React.Component {
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
    return (
      <View className='daysMatter'>
          
      </View>
    )
  }
}

export default DaysMatter
