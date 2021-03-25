import React from "react"
import Taro, { Component, Config } from '@tarojs/taro'
import { View ,ScrollView } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import SearchNav from "../../components/search/index.weapp"
import Loading from "../../components/loading/index.weapp"
import classnames from "classnames";
import {globalData} from "../../utils/common"

const {customBar,statusBarHeight}= globalData
// @connect(({ daysMatter }) => ({
//     ...daysMatter,
// }))

class DaysMatter extends React.Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props) {
    super(props)
    
  }
  state = {
    keyword:'',
    inputing:false,
  }
  componentDidMount() {
    
  }
  //搜索框
  changeStatus = inputing => {
    this.setState({
      inputing,
      keyword:''
    })
  }
  //输入绑定
  bindInput = ({detail}) =>{
    let {value} = detail;
    this.setState({
      keyword:value
    })
  }
  search = ()=>{}
  onScrollToUpper() {}

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  onScroll(e){
    console.log(e.detail)
  }

  render() {
    const {inputing,keyword} = this.state
    const cls = classnames({
      'flip-box':true
    })
    const scrollStyle = {
      height: `calc(100vh - ${customBar+statusBarHeight}px)`,
      padding:'0 30rpx',
      'box-sizing':'border-box'
    }
    const scrollTop = 0
    const Threshold = 20
    const vStyleA = {
      height: '150px',
      'background-color': 'rgb(26, 173, 25)'
    }
    const vStyleB = {
       height: '150px',
      'background-color': 'rgb(39,130,215)'
    }
    const vStyleC = {
      height: '150px',
      'background-color': 'rgb(241,241,241)',
      color: '#333'
    }
    return (
      <View className='daysMatter'>
          <SearchNav keyword={keyword} inputing={inputing} search={this.search} bindInput={this.bindInput}
          changeStatus={this.changeStatus}></SearchNav>
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
            style={scrollStyle}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
            onScroll={this.onScroll}
          >
            <View style={vStyleA}>A</View>
            <View style={vStyleB}>B</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleC}>C</View>
          </ScrollView>
      </View>
    )
  }
}

export default DaysMatter
