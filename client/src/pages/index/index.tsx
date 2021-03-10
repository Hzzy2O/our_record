import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text ,Swiper, SwiperItem} from '@tarojs/components'
import './index.scss'
import SearchNav from "../../components/search/index.weapp"
import Card from "../../components/card/index.weapp"

export default class Index extends Component {

  state = {
    keyword:'',
    inputing:false,
    year:2021
  }

  changeStatus = inputing => {
    this.setState({
      inputing,
      keyword:''
    })
  }

  bindInput = ({detail}) =>{
    let {value} = detail;
    this.setState({
      keyword:value
    })
  }

  search = () =>{
    console.log(123);
  }

  componentDidMount(){
    this.setState({
      year:new Date().getFullYear()
    })
  }

  render () {
    const {keyword,inputing,year} = this.state;
    let count = 0;
    let months = Array.from({length:12},()=>++count);
    return (
      <View className='index'>
        <SearchNav keyword={keyword} inputing={inputing} search={this.search} bindInput={this.bindInput}
          changeStatus={this.changeStatus}></SearchNav>
        <View className='year_cho'>
          <Text>{year}</Text>
        </View>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          previousMargin='80px'
          nextMargin='30px'
          >
          {
            months.map(e=>{
              return <SwiperItem className='s_item'>
                <Card year={year} month={e}>1</Card>
              </SwiperItem>
            })
          }
        </Swiper>
      </View>
    )
  }
}


// click(){
//   Taro.createSelectorQuery().select('#canvas').node(res => {
//     const canvas = res.node
//     const context = canvas.getContext('2d')
//     canvas.width = 300//设置宽高，也可以放到wxml中的canvas标签的style中
//     canvas.hight = 300
//     lottie.setup(canvas)//要执行动画，必须调用setup,传入canvas对象

//     lottie.loadAnimation({//微信小程序给的接口，调用就完事了，原理不太懂
//       loop: true,//是否循环播放（选填）
//       autoplay: true,//是否自动播放（选填）
//       path:'https://assets1.lottiefiles.com/private_files/lf30_1rkyrmv9.json',//lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
//       // animationData,
//       rendererSettings:{
//         context//es6语法：等同于context:context（必填）
//       }       
//     })
//   }).exec()
// }