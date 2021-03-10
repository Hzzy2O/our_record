import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import classnames from "classnames";

import "./index.scss"
import { get } from 'lodash';

type Props = {
  year:number,
  month:number
}

function getDay(year,month){
  var d:any = new Date(year,month,1,0,0,0);
  var yD = new Date(d-1000);  //yD是前一天
  return yD.getDate();
}
const Card: FC<Props> = ({year,month}) =>{
  const cls = classnames({
    'card':true,
  })
  let day = getDay(year,month);
  return (
    <View className={classnames(cls)}>
      <View className='card_top'>
        <Text>{month}</Text>
      </View>
      <View className='card_sec'>
        <Text>{day}</Text>
      </View>
    </View>
  )
}

export default Card

