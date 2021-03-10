import { Component } from 'react'
import { View, Text ,Video ,Button } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'
import './index.scss'
import classNames from 'classnames'
import LoginButton from "../../components/login/index.weapp"

const us = ['oE4ww5IwL2Xf1EPIavkxxW9R5qFw','oE4ww5HO9UjfeZZRBq1_BF3fe3dk']
export default class Entry extends Component {

  state = {
    status:0,
    text:'login',
    clk:false
  }

  componentDidMount () {
    
   }

  componentDidShow () { }

  componentDidHide () { }

  login(){
    if(this.state.clk)return
    this.setState({
      status: 1,
      text:''
    }) 
    setTimeout(() => {
      this.setState({
        status: 2,
        text:'success'
      });
      setTimeout(() => {
        Taro.navigateTo({
          url:"../index/index"
        })
      }, 500);
    }, 2800);
  }
  render () {
    const {status,text} = this.state;

    return (
      <View className='entry'>
        <LoginButton status={status} text={text} click={this.login.bind(this)}></LoginButton> 
        <Video className='bg_video' loop autoplay controls={false} src="https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/smoke.mp4" />
      </View>
    )
  }
}

// Taro.cloud
//       .callFunction({
//         name: "login"
//       })
//       .then(res => {
//         let {openid} = res.result as any
//         wx.setClipboardData({
//           data: openid,
//           success: function() {
//             // self.setData({copyTip:true}),
//             wx.showModal({
//             title: '提示',
//             content: '复制成功',
//             success: function(res) {
//               if (res.confirm) {
//                 console.log('确定')
//               } else if (res.cancel) {
//                 console.log('取消')
//               }
//             }
//           })
//         }})
//       })
    