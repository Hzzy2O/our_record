import React, { Component } from 'react'
import Taro,{getCurrentInstance} from '@tarojs/taro'
import { View, Swiper,SwiperItem } from '@tarojs/components'
import "./index.scss"
import { globalData ,getNowDate ,getDayOfWeek } from "../../utils/common"
import PuppComponent from "../../components/pupp/index.weapp"
import { AtList, AtListItem,AtIcon } from "taro-ui"


const {statusBarHeight,customBar} = globalData
export default class Index extends Component {
  
  state = {
    dataList:[],
    currentPage:0,
    currentImg:0,
    menuShow:false
  }

  componentDidMount(){
    let params = getCurrentInstance().router?.params;
    console.log(JSON.parse(Taro.getStorageSync('diaryList')))
    let data = JSON.parse(Taro.getStorageSync('diaryList'));
    this.setState({
      dataList:data,
      currentPage:params?.idx
    })
  }

  pageChange(e){
    this.setState({
      currentPage:e.detail.current
    })
  }

  setMenuShow(bool){
    this.setState({
      menuShow:bool
    })
  }

  render () {
    // this.drawProgressbg()
    // console.log(document.body)
    const { currentPage ,dataList ,menuShow } =this.state
    return (
      <View className='diary'>
        <Swiper
        className='outer-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        current={currentPage}
        onChange={this.pageChange.bind(this)}>
        {
          dataList.map((diary:any)=>{
            const {bt_year,bt_month,bt_date} = diary;
            let {day} = getNowDate([bt_year,bt_month,bt_date].join('-'));
            let time = `${getDayOfWeek(day)}. ${bt_date}月 ${bt_month} / ${bt_year}`
            return <SwiperItem className="os-item">
              <View style={`height:${customBar}PX`}></View>
                <View className='img-area'>
                  {
                    diary.picArr.length&&<Swiper
                    className='img-swiper'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    indicatorDots>
                      {
                        diary['picArr'].map(e=>{
                          return <SwiperItem>
                            <View className='box' style={{ background: `#fff  ${e ? 'url(' + e + ')' : ''} center/auto 106% no-repeat border-box border-box;` }}></View>
                          </SwiperItem>
                        })
                      }
                    </Swiper>
                  }
                </View>
                <View className='txt-area'>
                  <View className='ta-time'>
                    {time}
                  </View>
                  <View className='ta-title'>
                    {diary.title}
                  </View>
                  <View className='ta-content'>
                    {diary.content}
                  </View>
                </View>
              </SwiperItem>
          })
        }
      </Swiper>
      <View className='foot_box'>
        <View className='iconfont iconshare-more' style='font-size:30px;color:#000;' onClick={this.setMenuShow.bind(this,true)}></View>
        <AtIcon onClick={()=>Taro.navigateBack({delta:1})} value='close' size='25' color='#000'></AtIcon>
      </View>
      <PuppComponent show={menuShow} cancel={this.setMenuShow.bind(this,false)} >
          <AtList hasBorder={false} className='menulist'>
            <AtListItem title='喜欢' iconInfo={{ size: 20, color: '#333', value: 'heart', }}/>
            <AtListItem title='下载' iconInfo={{ size: 20, color: '#333', value: 'download', }}/>
            <AtListItem title='编辑' iconInfo={{ size: 20, color: '#333', value: 'edit', }}/>
            <AtListItem title='删除' iconInfo={{ size: 20, color: '#333', value: 'trash', }}/>
          </AtList>
        </PuppComponent>
      </View>
    )
  }
}
