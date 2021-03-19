import React, { CSSProperties, FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Icon} from '@tarojs/components'
import classnames from "classnames";

import "./index.scss"

type Props = {
  picArr:string [];
  style:CSSProperties;
}

const PicDisplay: FC<Props> = ({picArr,style}) =>{
  const cls = classnames({
    'login_btn':true
  })
  return (
    <View className='pic_contain' style={{...style}}>
      <View className='nopic'>
        <View className='iconfont icontupiantianjia' style='font-size:60PX;color:#5d5d5d;' ></View>
      </View>
    </View>
  )
}

export default PicDisplay

