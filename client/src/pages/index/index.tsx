import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text ,Swiper, SwiperItem } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.scss'
import SearchNav from "../../components/search/index.weapp"
import Card from "../../components/card/index.weapp"
import {getMonth,updateMonth} from "../../apis"
import {upload,getPic} from "../../apis/upload"
import {Month , Day} from "../../types"
import classnames from "classnames";
import {connect} from 'react-redux'
import Loading from "../../components/loading/index.weapp"
import CanvasCircle from "../../components/canvas/index.weapp"
import PuppComponent from "../../components/pupp/index.weapp"
import { globalData ,COLORS } from "../../utils/common"

// let {windowWidth,windowHeight} = globalData;
type StateProps = {
  currentTab:number
}

type DispatchProps = {
  changeBar: (bool) => void;
  setTab:(data)=>void;
}

type Iprop = StateProps & DispatchProps

interface Index {
  props:Iprop
}
@connect(state => ({
  currentTab: state.global.currentTab,
}),
dispatch => ({
  setTab(payload:any){
    dispatch({type:'global/setTab',payload})
  },
  changeBar(payload:any){
    dispatch({type:'global/changeBarShow',payload})
  }
}))
class Index extends Component {
  state = {
    keyword:'',
    inputing:false,
    year:2021,
    months:[] as Array<Month>,
    mon_status:1,
    btn_status:false,
    transing:false, //状态变化中
    loading:false,
    cir:[] as any,
    show1:false,
    currentMonth:0,
    currentColor:''
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

  hidePupp(show){
    this.setState({
      [show]:false
    },()=>this.props.changeBar({showBar:true}))
    
  }

  toDiaryList(month){
    Taro.navigateTo({
      url:"/pages/diaryList/index?month="+month
    })
  }
  //打开弹窗
  openPupp(show,month){
    let data = this.state.months[month-1];
    this.setState({
      [show]:true,
      currentMonth:month,
      currentColor:data.color
    },()=>this.props.changeBar({showBar:false}))
  }
  setCurrentMonth(key,val){
    const {currentMonth,months} = this.state;
    let data = months[currentMonth-1];
    if(Array.isArray(key)){
      key.map((e,i)=>data[e]=val[i])
    }else{
      data[key] = val;
    }
    this.setState({
      [`months[${currentMonth-1}]`]:data
    })
    return {
      currentMonth
    }
  }
  //改变月份颜色
  changeCardColor(e){
    const {currentMonth} = this.setCurrentMonth(['color','pic'],[e,'']);
    updateMonth({month:currentMonth,color:e,pic:''})
    this.hidePupp('show1')
  }
  //设置卡片照片
  setMonthPic(){
    let _this = this;
    Taro.chooseImage({
      count:1,
      async success(res){
        let ans = await upload(res.tempFilePaths[0]),
        pic = await getPic(ans);
        const {currentMonth} = _this.setCurrentMonth('pic',pic);;
        updateMonth({month:currentMonth,pic})
        _this.hidePupp('show1')
      }
    }).catch(void 0)
  }

  changeMonStatus(e){
    e.preventDefault()
    const {mon_status,transing,btn_status} = this.state;
    if(transing)return
    let status;
    let flag = mon_status===0;
    this.setState({
      mon_status:flag ? 3:4,
      transing:true,
      btn_status:!btn_status
    })
    status = flag ? 1 : 0;
    setTimeout(() => {
      this.setState({
        mon_status:status,
        transing:false,
      })
    }, 450);
  }

  toNewdiary(dataSel){
    this.props.setTab({currentTab:1,dataSel})
  }
  //初始化数据
  async init(){
    this.setState({loading:true})
    const {list} = await getMonth()
    this.setState({
      months:list
    },()=>{
      this.props.changeBar({showBar:true})
      this.setState({loading:false})
    }
    )
  }
  componentDidShow(){
    this.setState({
      year:new Date().getFullYear()
    })
    this.init()
  }
  render () {
    let {keyword,inputing,year,months,mon_status,loading,btn_status,show1,currentColor} = this.state;

    const {windowWidth} = Taro.getSystemInfoSync();

    //边距适配
    let mgpx = (windowWidth*0.122) + 'px'

    //当前月
    let cur_mon = new Date().getMonth()
    const btncls = classnames({
      'open_btn':true,
      'front_btn':btn_status,
      'back_btn':!btn_status
    })
    return (
      <View className='index' catchMove>
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
            months.map((e : Month) => {
              return <SwiperItem className='s_item'>
                <Card monthData={e} btn_status={btn_status} monStatus={mon_status} openClk={this.openPupp.bind(this,'show1',e.month)} toNewdiary={this.toNewdiary.bind(this)}></Card>
              </SwiperItem>
            })
          }
        </Swiper>
        <View className='open_cal'>
          <View className={btncls} onClick={this.changeMonStatus.bind(this)}>
            <Text>{btn_status ? '日历':'返回'}</Text>
          </View>
        </View>
        <View className='bottom_btn'></View>
        <Loading loading={loading}/>
        <CanvasCircle />
        <PuppComponent show={show1} cancel={this.hidePupp.bind(this,'show1')} >
          <AtList hasBorder={false}>
            <AtListItem title='pic' arrow='right' onClick={this.setMonthPic.bind(this)}/>
            <View className='color-tit'>color</View>
            <View className='color-list'>
              {
                COLORS.map(e=>{
                  let icon = <View className='iconfont iconduigou' style='font-size:20PX;color:#fff;'></View>
                  return <View className='color-cir' style={{background:e}} onClick={this.changeCardColor.bind(this,e)}>
                    { e==currentColor && icon }
                  </View>
                })
              }
            </View>
          </AtList>
        </PuppComponent>
      </View>
    )
  }
}
export default Index