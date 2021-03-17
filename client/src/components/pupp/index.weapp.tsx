import React,{ FC,memo } from "react";
import Taro, {Component, onThemeChange} from '@tarojs/taro'
import {View, MovableArea,MovableView,CoverView} from '@tarojs/components'
import { globalData } from "../../utils/common"
import classnames from "classnames";
import "./index.scss"

let width = globalData.windowWidth, height = globalData.windowHeight;
type Props = {
  show : boolean;
  cancel :any
}

class PuppComponent extends React.Component{
  static defaultProps = {
    show : false,
    cancel :()=>{}
  }
  public state = {
    y_start:0,
    y_end:0,
    ty:false,
    trans:false
  }
  constructor(props:Props) {
    super(props);
  }
  catchMove(e){
    console.log(e)
  }

  tStart(e){
    this.setState({
      y_start:e.changedTouches[0].clientY,
      trans:false
    })
  }
  tEnd(e){
    this.setState({
      trans:true
    })
    const func = () =>{
      this.setState({
        ty:true
      });
      Taro.nextTick(() => {
        this.setState({ ty: false }) // 在当前同步流程结束后，下一个时间片执行
      })
    }
    let y_end = e.changedTouches[0].clientY;
    let {y_start} = this.state
    if(y_end / height >= 0.78 && y_end-y_start>120){
      const {cancel} = this.props as any;
      cancel&&cancel()
      setTimeout(() => {
        func()
      }, 400);
    }else{
      func()
    }
  }
    render(){
      const {show,cancel } = this.props as any
      const {ty,trans} = this.state
      const cls1 = classnames({
        'PuppComponent':true,
        'PuppHidden':!show
      })
      const cls2 = classnames({
        'm-view':true
      })
      return (
        <CoverView className={cls1} style={{width,height}} onClick={cancel.bind(this)} catchMove>
          <MovableArea className='m-area' onClick={(e)=>e.stopPropagation()} style={{height:ty?'40vh':'80vh'}}>
            <MovableView id='mview' direction='vertical' className={cls2} scaleMin={1} scaleMax={1} 
             y={0} onTouchEnd={this.tEnd.bind(this)} style={{transition:trans?'transform .4s':''}}
            inertia onClick={(e)=>e.preventDefault()} onTouchStart={this.tStart.bind(this)}>
              {this.props.children}
            </MovableView>
          </MovableArea>
        </CoverView>
      )
    }
}

export default PuppComponent
