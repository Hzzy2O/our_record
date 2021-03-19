import React, { FC,memo,useState ,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Editor } from '@tarojs/components'
import classnames from "classnames";

import {GlobalModelState} from "../../models/global"

import "./index.scss"


const EditorArea = ({}) =>{
  const [showMenu,setShowMenu] = useState(false);
  const [editorCtx,setEditorCtx] = useState({});
  const [boradHeight,setBoradHeight] = useState(0);

  useEffect(()=>{
    Taro.onKeyboardHeightChange(res=>{
      setBoradHeight(res.height)
    });
  },[boradHeight])
  
  const cls = classnames({
    'loading_container':true,
  })
  const editorReady = e => {
    Taro.createSelectorQuery().select('#editor').context((res:any) => {
      setEditorCtx(res.context)
    }).exec()
  }
  const mouseFocus = (e) => {
    console.log(e)
  }
  return (
    <View className='editor'>
      <Editor className='editor' id='editor' placeholder='内容' onReady={editorReady} onFocus={mouseFocus} style={{height:'40PX',minHeight:'40PX',overflow:'hidden'}}/>
      <View style='height:100PX;width:100vw;'></View>
      <View className='bottom_btn' style={{bottom:boradHeight+"PX"}}>
        <View>1233333333333</View>
      </View>
    </View>
  )
}

export default EditorArea

