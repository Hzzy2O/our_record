import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Input } from '@tarojs/components'
import classnames from "classnames";
import { BreedingRhombusSpinner,SwappingSquaresSpinner ,
  FulfillingBouncingCircleSpinner,LoopingRhombusesSpinner,ScalingSquaresSpinner
} from './epic-spinner/index'
import {GlobalModelState} from "../../models/global"

import "./index.scss"


const Loading = ({loading}) =>{
  const cls = classnames({
    'loading_container':true,
  })
  let number = Math.random()*5 | 0;

  // useSelector((state:GlobalModelState) => {
  //   console.log(state)
  // })
  return (
    loading&&<View className={cls}>
      {number===0&&<BreedingRhombusSpinner color={'red'} size={'23px'}/>}
      {number===1&&<SwappingSquaresSpinner color={'red'} size={'23px'}/>}
      {number===2&&<FulfillingBouncingCircleSpinner color={'red'} size={'23px'}/>}
      {number===3&&<LoopingRhombusesSpinner color={'red'} size={'23px'}/>}
      {number===4&&<ScalingSquaresSpinner color={'red'} size={'23px'}/>}
    </View>
  )
}

export default Loading

