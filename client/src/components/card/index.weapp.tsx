import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import classnames from "classnames";
import {Month} from "../../types"
import "./index.scss"

type Props = {
  monthData:Month;
  monStatus:number;
  openClk:any;
}

const Card: FC<Props> = ({monStatus,monthData,openClk}) =>{
  const cls = classnames({
    'card1':true,
    'flip-container':true
  })

  const card1 = classnames({
    'frame':true,
    'z1':monStatus===1,
    'z2':monStatus===0,
    'front':monStatus===4,
    'back':monStatus===3,
  })
  const card2 = classnames({
    'frame':true,
    'z2':monStatus===1,
    'z1':monStatus===0,
    'front':monStatus===3,
    'back':monStatus===4
  })
  //结构月份数据
  const {month,days,color,desc,bt_year,daysArr} = monthData;
  
  let isToday = 1;
  let rdc_day = new Date(`${bt_year}-${month}-1`).getDay()-1;
  let arr1 = Array.from({length:rdc_day},()=>0);
  daysArr.sort((a,b)=>a.day-b.day)
  return (
    <View className='rotateCtn'>
      <View className={classnames(card1)}>
        <View className={classnames(cls)}>
        <View className='card_top'>
          <Text>{month}</Text>
        </View>
        <View className='card_sec'>
          <Text>{desc}</Text>
        </View>
        <View className='card_ft'>
          <View className='day_progress'>
            <View className='progress_box'>
              <View className='progress_line' style={{width:'50%'}}></View>
            </View>
            <View>
                1/{days}
            </View>
          </View>
          <View onClick={openClk.bind(this)} className='iconfont iconshare-more' style='font-size:30px;color:#fff;'></View>
        </View>
      </View>
      </View>
      <View className={classnames(card2)}>
        <View className='card2'>
          <View className='c2_box'>
            <View className='card_top'>
              <Text>{month}</Text>
            </View>
            <View className='card_sec'>
              <Text>{desc}</Text>
            </View>
            <View className='cal_box'>
              <View className='cal_grid'>
                {
                  arr1.map(e=>{
                    return <View className='cal_item' style={{visibility:"hidden"}}>{e}</View>
                  })
                }
                { 
                  daysArr.map(e=>{
                    return <View className='cal_item' style={{visibility:e.day>0?"visible":"hidden"}}>{e.day}</View>
                  })
                }
              </View>
            </View>
            
          </View>
        </View>
      </View>
      
    </View>
    
  )
}

export default Card

