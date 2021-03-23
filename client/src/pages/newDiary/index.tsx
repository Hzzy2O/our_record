import React from "react"
import Taro, {  Config } from '@tarojs/taro'
import { View , Picker ,Editor ,Button } from '@tarojs/components'
import {createDianry} from "../../apis/index"
// import { connect } from '@tarojs/redux'
import './index.scss'
import { globalData ,getNowDate ,getDayOfWeek } from "../../utils/common"
import {connect} from 'react-redux'
import { AtInput ,AtToast ,AtModal} from 'taro-ui'
import PicDisplay from "./picDisplay/index.weapp"
import EdictorArea from "../../components/editor/index.weapp"
import {upload,getPic} from "../../apis/upload"

type StateProps = {
  currentTab:number;
  prevTab:number;
  dataSel:string;
}

type DispatchProps = {
  setTab: (bool) => void;
  changeBar: (bool) => void;
}

type Iprop = StateProps & DispatchProps

interface Newdiary {
  props:Iprop,
  state:any
}

@connect(({global}) => ({
  currentTab: global.currentTab,
  prevTab:global.prevTab,
  dataSel:global.dataSel
}),
dispatch => ({
  setTab(payload:any){
    dispatch({type:'global/setTab',payload})
  },
  changeBar(payload:any){
    dispatch({type:'global/changeBarShow',payload})
  }
}))

class Newdiary extends React.Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props) {
    super(props)
    this.state = {
      dateSel:'',
      dateTxt:'',
      editorCtx:null,
      toastShow:false,
      diaryData:{
        title:'',
        content:''
      },
      picArr:[],
      modalShow:false,
      currentImg:0,
      }
  }

  componentDidMount() {
    this.setDate(this.props.dataSel);
  }
  shouldComponentUpdate(props){
    let bool = (props.dataSel === this.props.dataSel)
    !bool&&this.setDate(props.dataSel);
    return true
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

  undo = e => {
    this.state.editorCtx.undo()
  }
  //输入框
  handleChange(val,key){
    this.setState({
      [key]:val
    })
  }
  iptBind1(e:any){
    const {diaryData} = this.state;
    diaryData.title = e;
    this.setState({
      diaryData
    })
  }
  iptBind2(e:any){
    const {diaryData} = this.state;
    diaryData.content = e;
    this.setState({
      diaryData
    })
  }
  backPage(){
    const {setTab,prevTab} = this.props;
    setTab({currentTab:prevTab})
  }
  onDateChange(e){
    this.setDate(e.detail.value)
  }
  deleteImg(){
    let {currentImg} = this.state
    let {picArr} = this.state;
    picArr.splice(currentImg,1)
    this.setState({picArr,modalShow:false})
  }
  setModal = (bool,idx?:number) => this.setState({
    modalShow:bool?true:false,
    currentImg:idx?idx:0
  })
  uploadImg(){
    let _this = this, {picArr} = this.state; 
    try {
      Taro.chooseImage({
        async success(res){
          let ans = await upload(res.tempFilePaths[0]),
          pic = await getPic(ans);
          picArr.push(pic);
          _this.setState({picArr})
        }
      })
    } catch (error) {
      
    }
    
  }
  async submit(){
    const {diaryData,dateSel,picArr} = this.state,
      {title,content} = diaryData;
    if(!title){
      this.setState({
        toastShow:true
      })
    } else{
      let [bt_year,bt_month,bt_date] = dateSel.split("-").map(e=>+e);
      let time = [new Date().getHours(),new Date().getMinutes(),new Date().getSeconds()].join(':')
      let data = {
        title,content,bt_year,bt_month,bt_date,picArr,time
      }
      await createDianry(data)
      this.backPage()
    }
  }
  render() {
    let {statusBarHeight,customBar} = globalData;
    const {dateSel,dateTxt,toastShow,diaryData,picArr,modalShow} = this.state;
    return (
      <View className='newdiary'>
          <View className='top_nav' style={`padding-top:${statusBarHeight}PX;height:${customBar}PX`}>
            <View className='iconfont .iconchevron-left-copy' style='font-size:30PX;color:#000;' onClick={()=>this.backPage()}></View>
            <View className='mid_tit' >
              <Picker mode='date' onChange={this.onDateChange.bind(this)} value={dateSel} start={"2021-01-01"}>
                <View>{dateTxt}</View>
              </Picker>
            </View>
            <View className='white' style='font-size:0PX;color:#000;'></View>
          </View>
          <View style={`width:100vw;height:${customBar+statusBarHeight}PX;backround:#fff;`}></View>
          <PicDisplay picArr={picArr} style={{top:customBar+statusBarHeight+'PX'}} uploadImg={this.uploadImg.bind(this)} openModal={this.setModal.bind(this)}/>
          <View className='txt-container'>
            <AtInput
                name='value'
                title=''
                type='text'
                placeholder='标题'
                placeholderStyle='text-align:center'
                value={diaryData.title}
                onChange={this.iptBind1.bind(this)}
              />
             <EdictorArea contentChange={this.iptBind2.bind(this)} submit={()=>this.submit()}/>
          </View>
          <AtToast isOpened={toastShow} text="标题是必须的"></AtToast>
          <AtModal
            isOpened={modalShow}
            title=''
            cancelText='取消'
            confirmText='确认'
            onClose={ ()=>this.setModal(false) }
            onCancel={ ()=>this.setModal(false) }
            onConfirm={ ()=>this.deleteImg() }
            content='删除这张图片?'
          />
      </View>
    )
  }
}

export default Newdiary
