import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text ,Swiper, SwiperItem } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.scss'
import SearchNav from "../../components/search/index.weapp"
import Card from "../../components/card/index.weapp"
import {getMonth} from "../../apis"
import {Month} from "../../types"
import classnames from "classnames";

import Loading from "../../components/loading/index.weapp"
import CanvasCircle from "../../components/canvas/index.weapp"
import PuppComponent from "../../components/pupp/index.weapp"
import { globalData ,COLORS } from "../../utils/common"

let {windowWidth,windowHeight} = globalData;
type index = {
  keyword:string;
  inputing:boolean;
  year:number;
  months:Array<Month>
}

const cir:any[] = []
export default class Index extends Component {
  state = {
    keyword:'',
    inputing:false,
    year:2021,
    months:[],
    mon_status:1,
    btn_status:false,
    transing:false, //状态变化中
    loading:false,
    cir:[] as any,
    show1:false
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
  search = ()=>{}

  hidePupp(show){
    this.setState({
      [show]:false
    })
  }

  openPupp(show){
    console.log(show)
    this.setState({
      [show]:true
    })
  }
  
  changeMonStatus(){
    const {mon_status,transing,btn_status} = this.state;
    if(transing)return
    let status;
    if(mon_status===0){
      this.setState({
        mon_status:3,
        transing:true
      })
      status = 1;
    } else {
      this.setState({
        mon_status:4,
        transing:true
      })
      status = 0;
    }
    setTimeout(() => {
      this.setState({
        mon_status:status,
        transing:false,
        btn_status:!btn_status
      })
    }, 450);
  }

  //初始化数据
  async init(){
    this.setState({loading:true})
    const {list} = await getMonth()
    console.log(list)
    this.setState({
      months:list
    },()=>
    this.setState({loading:false}))
  }
  componentDidMount(){
    this.setState({
      year:new Date().getFullYear()
    })
    this.init()
  }
  render () {
    let {keyword,inputing,year,months,mon_status,loading,btn_status,show1} = this.state;

    const {windowWidth} = Taro.getSystemInfoSync();

    //边距适配
    let mgpx = (windowWidth*0.122) + 'px'

    //当前月
    let cur_mon = new Date().getMonth()
    const btncls = classnames({
      'open_btn':true,
      'front':btn_status,
      'back':!btn_status
    })
    return (
      <View className='index' style={{width:windowWidth,height:windowHeight}}>
        <SearchNav keyword={keyword} inputing={inputing} search={this.search} bindInput={this.bindInput}
          changeStatus={this.changeStatus}></SearchNav>
        <View className='year_cho'>
          <Text className='year_txt'>{year}</Text>
        </View>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          previousMargin={mgpx}
          nextMargin={mgpx}
          current={cur_mon}
          >
          {
            months.map(e=>{
              return <SwiperItem className='s_item'>
                <Card monthData={e} monStatus={mon_status} openClk={this.openPupp.bind(this,'show1')}></Card>
              </SwiperItem>
            })
          }
        </Swiper>
        <View className='open_cal'>
          <View className={btncls} onClick={this.changeMonStatus.bind(this)}>
            <Text>{btn_status ? '日历':'返回'}</Text>
          </View>
        </View>
        <Loading loading={loading}/>
        <CanvasCircle />
        <PuppComponent show={show1} cancel={this.hidePupp.bind(this,'show1')}>
          <AtList hasBorder={false}>
            <AtListItem title='pic' arrow='right' />
            <AtListItem
              title='color'
              hasBorder={false}
            />
            <View className='color-list'>
              {
                COLORS.map(e=>{
                  return <View className='color-cir' style={{background:e}}></View>
                })
              }
             
            </View>
          </AtList>
        </PuppComponent>
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