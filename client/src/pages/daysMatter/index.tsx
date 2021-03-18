import React from "react"
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import Loading from "../../components/loading/index.weapp"
import classnames from "classnames";
// @connect(({ daysMatter }) => ({
//     ...daysMatter,
// }))

class DaysMatter extends React.Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props) {
    super(props)
    this.state = {
      flag:false
    }
  }

  componentDidMount() {
    
  }

  render() {
    console.log(this.state)
    const cls = classnames({
      'flip-box':true,
      'flip-box-change':this.state.flag
    })
    return (
      <View className='daysMatter'>
         
      </View>
    )
  }
}

export default DaysMatter
