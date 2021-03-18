import { Component } from 'react'
import { View, Text ,Video ,Button } from '@tarojs/components'
import Taro, { Config } from '@tarojs/taro'
import './index.scss'
import classNames from 'classnames'
import {login} from "../../apis"
import LoginButton from "../../components/login/index.weapp"

const us = ['oE4ww5IwL2Xf1EPIavkxxW9R5qFw','oE4ww5HO9UjfeZZRBq1_BF3fe3dk']
export default class Entry extends Component {

  state = {
    status:0,
    text:'login',
    clk:false
  }
  componentDidShow () { }

  componentDidHide () { }

  async login(){
    if(this.state.status===3)return
    this.setState({
      status: 1,
      text:''
    }) 
    const {openid} = await login();
    if(us.includes(openid)){
      setTimeout(() => {
        this.setState({
          status: 2,
          text:'success'
        });
        setTimeout(() => {
          Taro.switchTab({
            url:"../index/index"
          })
        }, 500);
      }, 2000);
    } else{
      this.setState({
        status: 3,
        text:'error'
      });
    }
      
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

