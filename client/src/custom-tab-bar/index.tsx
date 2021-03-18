import React from "react";
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import  './index.scss';
import {connect} from 'react-redux'
import classnames from "classnames";
import {tabList} from "../utils/common"
const list = tabList;

type StateProps = {
  currentTab:number;
  showBar:boolean;
}

type DispatchProps = {
  setTab: (index) => void;
}

type Iprop = StateProps & DispatchProps

interface CustomTabBar {
  props:Iprop
}
@connect(({global}) => ({
  currentTab: global.currentTab,
  showBar:global.showBar
}),
  dispatch => ({
    setTab(payload:any){
      dispatch({type:'global/setTab',payload})
    }
  }))

class CustomTabBar extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    // 建立一个全局变量储存selectedIndex
    // 创建方法可以按照自己的方法或taro提供的示例
    // 当然没有这个全局变量也可以解决问题
    show: this.props.showBar
  };

  switchTab = ( index) => {
    const {setTab} = this.props;
    setTab({currentTab:index});
  };

  shouldComponentUpdate = (_nextProps, nextState) => {
    return true
  };

  render() {
    const cls = classnames({
      'tabBar':true,
      'hideBar':!this.props.showBar
    })
    return (
      <View className={cls}>
        <View className='tabBarBorder' />
        {list.map((item, index) => {
          const isSelected = this.props.currentTab === index;
          return (
            <View
              className='tabBarItem'
              onClick={() => this.switchTab(index)}
              data-path={item.pagePath}
              key={index}
            >
              <Image src={isSelected ? item.selectedIconPath : item.iconPath} />
              <View
                style={{
                  color: isSelected ? 'rgba(0, 162, 0, 1)' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default CustomTabBar;