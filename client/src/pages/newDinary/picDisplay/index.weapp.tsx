import React, { CSSProperties, FC,memo,useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Icon , Swiper, SwiperItem ,CoverView} from '@tarojs/components'
import classnames from "classnames";

import "./index.scss"

type Props = {
  picArr:string [];
  style:CSSProperties;
  uploadImg:any;
  openModal:any;
}

const PicDisplay: FC<Props> = ({picArr,style,uploadImg,openModal}) =>{
  const cls = classnames({
    'login_btn':true
  })
  const [curIdx,setCurIdx] = useState(0);

  const sChange = e =>{
    setCurIdx(e.detail.current)
  }
  const openDele = () => {
    console.log(123)
    openModal(true,curIdx)
  }
  return (
    <View className='pic_contain' style={{...style}} >
      {
        picArr.length===0&&<View className='nopic' onClick={uploadImg} >
          <View className='iconfont icontupiantianjia' style='font-size:60PX;color:#5d5d5d;' ></View>
        </View>
      }
      {
        picArr.length>0&& <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          onChange={sChange.bind(this)}
          indicatorDots>
          {
            picArr.map(e=>{
              return <SwiperItem>
              <View className='box' style={{ background: `#fff  ${e ? 'url(' + e + ')' : ''} center/auto 106% no-repeat border-box border-box` }}></View>
            </SwiperItem>
            })
          }
          <CoverView className='pic_menus'>
            <CoverView className="add" onClick={uploadImg}></CoverView>
            <CoverView className="reduce" onClick={openDele}></CoverView>
          </CoverView>
        </Swiper>
      }
    </View>
  )
}

export default PicDisplay

