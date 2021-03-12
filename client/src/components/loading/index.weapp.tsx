import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Input } from '@tarojs/components'
import classnames from "classnames";
import { BreedingRhombusSpinner,SwappingSquaresSpinner ,
  FulfillingBouncingCircleSpinner,LoopingRhombusesSpinner,ScalingSquaresSpinner
} from './epic-spinner/index'
import "./index.scss"


const Loading = ({}) =>{
  const cls = classnames({
    'loading_container':true,
  })
  let number = Math.random()*5|0;
  console.log(number)
  return (
    <View className={cls}>
      <BreedingRhombusSpinner color={'red'} size={'23px'}/>
      <SwappingSquaresSpinner color={'red'} size={'23px'}/>
      <FulfillingBouncingCircleSpinner color={'red'} size={'23px'}/>
      <LoopingRhombusesSpinner color={'red'} size={'23px'}/>
      <ScalingSquaresSpinner color={'red'} size={'23px'}/>
    </View>
  )
}

export default Loading

