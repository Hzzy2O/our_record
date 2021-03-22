import React, { FC,memo,useState ,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button ,Editor ,Textarea} from '@tarojs/components'
import classnames from "classnames";
import {globalData} from "../../utils/common"
import {GlobalModelState} from "../../models/global"

import "./index.scss"

const {windowHeight} = globalData;
type Props = {
  contentChange:any;
  submit:any
}

const EditorArea:FC<Props> = ({contentChange,submit}) =>{
  const [showMenu,setShowMenu] = useState(false);
  const [editorCtx,setEditorCtx] = useState({});
  const [boradHeight,setBoradHeight] = useState(0);
  const [btmHeight,setBtmHeight] = useState(0);

  useEffect(()=>{
    Taro.onKeyboardHeightChange(res=>{
      setBoradHeight(res.height)
    });
    
  },[boradHeight])
  
  return (
    <View className='editor'>
      <Textarea className='editor' id='editor' style={`background:#fff;min-height:50px;margin-bottom:185PX`} autoHeight maxlength={999} cursorSpacing={50} onInput={contentChange} adjust-position={true}/>
      {/* <View className='bottom_btn' style={{bottom:boradHeight?boradHeight-45:-38+"PX"}}>
        <View>{boradHeight}</View>
      </View> */}
      <View className='done_btn' onClick={submit}>
        done?
      </View>
    </View>
  )
}

export default EditorArea

