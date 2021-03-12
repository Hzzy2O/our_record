import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from "classnames";
import "./index.scss"


type Props = {
  color:string;
  size:string;
}
export const BreedingRhombusSpinner:FC<Props>  = ({}) =>{
  return (
    <View className='breeding-rhombus-spinner' >
      <View className='rhombus child-1'></View>
      <View className='rhombus child-2'></View>
      <View className='rhombus child-3'></View>
      <View className='rhombus child-4'></View>
      <View className='rhombus child-5'></View>
      <View className='rhombus child-6'></View>
      <View className='rhombus child-7'></View>
      <View className='rhombus child-8'></View>
      <View className='rhombus big'></View>
    </View>
  )
}

export const FulfillingBouncingCircleSpinner:FC<Props> = ({}) =>{
  return (
    <View className='fulfilling-bouncing-circle-spinner'>
      <View className='circle'></View>
      <View className='orbit'></View>
    </View>
  )
}

export const LoopingRhombusesSpinner:FC<Props> = ({}) =>{
  return (
    <View className='looping-rhombuses-spinner'>
      <View className='rhombus'></View>
      <View className='rhombus'></View>
      <View className='rhombus'></View>
    </View>
  )
}

export const ScalingSquaresSpinner:FC<Props> = ({}) =>{
  return (
    <View className='scaling-squares-spinner'>
      <View className='square'></View>
      <View className='square'></View>
      <View className='square'></View>
      <View className='square'></View>
    </View>
  )
}
export const SwappingSquaresSpinner:FC<Props> = ({}) =>{
  return (
    <View className='swapping-squares-spinner' >
      <View className='square'></View>
      <View className='square'></View>
      <View className='square'></View>
      <View className='square'></View>
    </View>
  )
}
