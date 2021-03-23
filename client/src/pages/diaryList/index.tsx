import Taro, { Component, getCurrentInstance } from '@tarojs/taro'
import React from "react"
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import Loading from "../../components/loading/index.weapp"
import {getDianryList} from "../../apis/index"
import {Day} from "../../types/index"
// @connect(({ diaryList }) => ({
//     ...diaryList,
// }))

class DiaryList extends React.Component {
  state = {
    diaryList:[]
  }

  async componentWillMount() {
    let param:any = getCurrentInstance().router?.params;
    Taro.setNavigationBarTitle({
      title:`${param.month}月 ${param.year}`
    })
    const {data} = await getDianryList({month:+param.month||3})
    this.setState({
      diaryList:data
    })
  }

  render() {

    const {diaryList} = this.state

    return (
      <View className='diaryList'>
          <View className='card-box'>
            {
              diaryList.map((e:any)=>{
                 return <View className='card'>
                  <View className='card-left'>
                    <View className='card-info'>
                      <View style='font-size:22px;font-weight:700'>{e.bt_date}</View>
                      <View>{e.time}</View>
                    </View>
                  </View>
                  <View className='line'></View>
                  <View className='card-right'>
                    {
                      e.picArr.length>0&&<View className='card-img' style={`background: #999 url(${e.picArr[0]})
                      center/ 100% no-repeat border-box border-box`}></View>
                    }
                     {
                       !e.picArr.length&&<View className='card-alt'>
                       <View className='symbol'>&#12317;</View>
                        <View className='card-title'>{e.title}</View>
                        <View className='symbol'>&#12319;</View>
                      </View>
                     }
                  </View>
                </View>
              })
            }
          </View>
      </View>
    )
  }
}

export default DiaryList
