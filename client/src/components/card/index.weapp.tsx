import React, { FC, memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image, CoverView } from '@tarojs/components'
import classnames from "classnames";
import { Month } from "../../types"
import { getPic } from "../../apis/upload"
import { getNowDate } from "../../utils/common"
import "./index.scss"

type Props = {
  monthData: Month;
  monStatus: number;
  openClk: any;
  btn_status: boolean;
  toNewdiary:any
}

const { year, month, date } = getNowDate()
let nowDate = [year, month].join("-")

const Card: FC<Props> = ({ monStatus, monthData, openClk, btn_status ,toNewdiary }) => {
  // const cls = classnames({
  //   'card1':true,
  //   'flip-container':true
  // })
  //结构月份数据
  const { month, days, color, desc, bt_year, daysArr, pic ,count } = monthData;

  let isToday = nowDate === [bt_year, month].join("-");
  const clsDayItem = (day) => classnames({
    'cal_item': true,
    'nowDay': isToday && date === day
  })
  const cls = classnames({
    'flip-box': true,
    'flip-box-change': btn_status
  })

  const toLost = () => {
    console.log(1)
  }

  const toList = (e) => {
    Taro.navigateTo({url:`/pages/diaryList/index?month=${month}&year=${bt_year}`})
  }

  const openPupp = (e) => {
    e.stopPropagation()
    openClk()
  }

  let rdc_day = new Date(`${bt_year}-${month}-1`).getDay() - 1;
  let arr1 = Array.from({ length: rdc_day }, () => 0);
  daysArr.sort((a, b) => a.day - b.day);

  let getDateSel = day => `${bt_year}-${month}-${day}`
  // let count.length = daysArr.filter(e => e.title).length;
  return (
    <View className="box-item" >
      <View className={cls}>
        <View
          className="flip-box-front text-center card1"
          style={{ background: ` ${color || '#e2e1e1'} ${pic ? 'url(' + pic + ')' : ''} center/auto 106% no-repeat border-box border-box` }}
        >
          <View className='inner' onClick={toList}>
          <View className='card_top'>
            <Text>{month}</Text>
          </View>
          <View className='card_sec'>
            <Text>{desc}</Text>
          </View>
          
          </View>
          <View className='card_ft'>
            <View className='day_progress'>
              <View className='progress_box'>
                <View className='progress_line' style={{ width: count.length / days *100 + '%' }}></View>
              </View>
              <View>
                {count.length}/{days}
              </View>
            </View>
            <View onClick={openPupp} className='iconfont iconshare-more' style='font-size:30px;color:#fff;'></View>
          </View>
        </View>
        <View
          className="flip-box-back text-center card2"
          style="background: white;"
        >
          <View className='inner'>
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
                    daysArr.map((e,i)=>{
                      let opc = e.title ||(isToday&&date===e.day) ? '0.9' : '0.42';
                      return <View className={clsDayItem(e.day)} style={{opacity:opc}} onClick={()=>toNewdiary(getDateSel(e.day))}>{e.day}</View>
                    })
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>


  )
}

export default Card

{/* <View className='rotateCtn'>
      <View className={classnames(card1)}>
        <View className={classnames(cls)} style={{background:` ${color||'#e2e1e1'} ${pic ? 'url('+pic+')' : ''} center/auto 100% no-repeat border-box border-box`}}>
        
      </View>
      </View>
      <View className={classnames(card2)}>
        <View className='card2'>
          
        </View>
      </View>
      
    </View> */}