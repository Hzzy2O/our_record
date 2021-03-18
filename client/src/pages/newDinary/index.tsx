import React from "react"
import Taro, {  Config } from '@tarojs/taro'
import { View , Picker ,Editor ,Button } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import { globalData ,getNowDate ,getDayOfWeek } from "../../utils/common"
import {connect} from 'react-redux'
import { AtInput } from 'taro-ui'
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
      dateTxt:'',
      editorCtx:null
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
  editorReady = e => {
    Taro.createSelectorQuery().select('#editor').context((res) => {
      this.setState({
        editorCtx : res.context
      })
    }).exec()
  }

  undo = e => {
    this.state.editorCtx.undo()
  }
  //输入框
  handleChange(){

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
          <View className='txt-container'>
            <AtInput
                name='value'
                title=''
                type='text'
                placeholder='标题'
                placeholderStyle='text-align:center'
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
             <Editor id='editor' className='editor' placeholder="请输入内容" onReady={this.editorReady}></Editor>
            {/* <Button type='warn' onClick={this.undo}>撤销</Button> */}
          </View>
      </View>
    )
  }
}

export default NewDinary
