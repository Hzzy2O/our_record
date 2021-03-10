import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import classnames from "classnames";

import "./index.scss"

type Props = {
  status : number;
  text : string,
  click :any
}

const LoginButton: FC<Props> = ({status,text,click}) =>{
  const cls = classnames({
    'login_btn':true,
    'loading_btn':status===1,
    'success_btn':status===2
  })
  return (
    <Button className={cls} onClick={click.bind(this)}>
      { status===0 && <Text className='login_txt'>{text}</Text> }
      {
        status===1 && <View>
          {/* <View className='left'></View>
          <View className='right'></View>
          <View className='progress'></View> */}
          <View className='circle_process'>
            <View className='right'>
            <View className='rightcircle'></View>
            </View>
            <View className='left'>
            <View className='leftcircle'></View>
            </View>
            
          </View>
            
        </View>
      }
      {  status === 2 && <View className='iconfont iconduigou' style='font-size:30PX;color:#fff;'></View>  }
    </Button>
  )
}

export default LoginButton

