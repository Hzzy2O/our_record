import React from "react"
import Taro, {  Config } from '@tarojs/taro'
import { View , Picker } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { globalData ,getNowDate ,getDayOfWeek } from "../../utils/common"
import {connect} from 'react-redux'
import PicDisplay from "./picDisplay/index.weapp"
import {upload,getPic} from "../../apis/upload"

type StateProps = {
  currentTab:number;
  prevTab:number
}

type DispatchProps = {
  setTab: (bool) => void;
  changeBar: (bool) => void;
}

type Iprop = StateProps & DispatchProps

interface NewDinary {
  props:Iprop,
  state:any
}

@connect(({global}) => ({
  currentTab: global.currentTab,
  prevTab:global.prevTab
}),
dispatch => ({
  setTab(payload:any){
    dispatch({type:'global/setTab',payload})
  },
  changeBar(payload:any){
    dispatch({type:'global/changeBarShow',payload})
  }
}))

class NewDinary extends React.Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props) {
    super(props)
    this.state = {
      dateSel:'',
      dateTxt:''
    }
  }

  componentDidMount() {
    this.setDate();
  }

  setDate(time?:string){
    const {year,month,date,day} = time ? getNowDate(time) : getNowDate();
    let dateSel = [year,month,date].join("-")
    let dateTxt = this.formatDate(year,month,date,day);
    this.setState({
      dateSel,
      dateTxt
    })
  }

  formatDate(year,month,date,day){
    return `${getDayOfWeek(day)}. ${month}月 ${date} / ${year}`
  }

  backPage(){
    const {setTab,prevTab} = this.props;
    setTab({currentTab:prevTab})
  }
  onDateChange(e){
    this.setDate(e.detail.value)
  }
  render() {
    let {statusBarHeight,customBar} = globalData;
    const {dateSel,dateTxt} = this.state;
    return (
      <View className='newDinary'>
          <View className='top_nav' style={`margin-top:${statusBarHeight}PX;height:${customBar}PX`}>
            <View className='iconfont .iconchevron-left-copy' style='font-size:30PX;color:#000;' onClick={()=>this.backPage()}></View>
            <View className='mid_tit' >
              <Picker mode='date' onChange={this.onDateChange.bind(this)} value={dateSel} start={"2021-01-01"}>
                <View>{dateTxt}</View>
              </Picker>
            </View>
            <View className='white' style='font-size:0PX;color:#000;'></View>
          </View>
          <View style={`width:100vw;height:${customBar+statusBarHeight}PX`}></View>
          <PicDisplay picArr={[]}/>
      </View>
    )
  }
}

export default NewDinary
