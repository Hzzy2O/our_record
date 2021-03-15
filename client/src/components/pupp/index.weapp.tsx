import React,{ FC,memo } from "react";
import Taro, {Component, onThemeChange} from '@tarojs/taro'
import {View, MovableArea,MovableView} from '@tarojs/components'
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
  constructor(props:Props) {
    super(props);
    this.state = {
      t_style:false,
      ty:0
    }
  }
  tChange(e){
    let rg = (e.detail.y);
    console.log(e)
    if(rg>120){
      const {cancel} = this.props as any;
      cancel&&cancel()
    }else{
      this.setState({
        ty:0
      })
    }
  }
    render(){
      const {show,cancel } = this.props as any
      const {ty} = this.state
      const cls1 = classnames({
        'PuppComponent':true,
        'PuppHidden':!show
      })
      const cls2 = classnames({
        'm-view':true
      })
      return (
        <View className={cls1} style={{width,height}} onClick={cancel.bind(this)}>
          <MovableArea className='m-area' style={{top:"50vh"}} onClick={()=>void 0}>
            <MovableView direction='vertical' className={cls2} scaleMin={1} scaleMax={1}
            onChange={this.tChange.bind(this)} y={0} out-of-bounds={true}
            inertia onClick={(e)=>e.preventDefault()}>
              {this.props.children}
            </MovableView>
          </MovableArea>
        </View>
      )
    }
}

export default PuppComponent
