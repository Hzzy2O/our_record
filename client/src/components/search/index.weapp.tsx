import React, { FC,memo } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Input } from '@tarojs/components'
import classnames from "classnames";

import "./index.scss"
import { bind } from 'lodash';

type Props = {
  keyword : string;
  inputing:boolean;
  search :any,
  changeStatus:any,
  bindInput:any
}


const getdate = () => {
  let date = new Date();
  return {
    day:date.getDate(),
    mon:date.getMonth(),
    yea:date.getFullYear()
  }
}

const SearchNav: FC<Props> = ({keyword,inputing,search,changeStatus,bindInput}) =>{
  const cls = classnames({
    'search':true,
  })
  let res = Taro.getSystemInfoSync();
  console.log(res.model)
  let h_flag = res.model.toLowerCase().includes("iphone x");
  const {day,mon,yea} = getdate();
  return (
    <View className={cls} style={{marginTop:h_flag?'6.5vh':'4.5vh'}}>
      {
        !inputing && <View className="search_out" >
          <View className='icon_box' onClick={()=>changeStatus(true)}>
            <View className='iconfont iconsousuo' style='font-size:20px;color:#000;'></View>
          </View>
          <View className='date_txt'>{mon}月,{day} / {yea}</View>
        </View>  
      }
      {
        inputing &&  <View className="search_in">
          <View className='search_input'>
            <View className='iconfont iconsousuo' style='font-size:10px;color:#000;'></View>
            <Input className='input' type='text' value={keyword} onInput={bindInput} onConfirm={search} focus/>
          </View>
          <View className='cancel' onClick={()=>changeStatus(false)}>
            <Text>取消</Text>
          </View>
        </View>
      }
      <Text>{inputing}</Text>
    </View>
  )
}

export default SearchNav

