import { Component } from 'react'
import { View, Text ,Video ,Button } from '@tarojs/components'
import './index.scss'
import classNames from 'classnames'
import LoginButton from "../../components/login/index.weapp"
export default class Entry extends Component {

  state = {
    status:0,
    text:'login',
    clk:false
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

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
      }) 
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
