import React from "react";
import Taro from '@tarojs/taro';
import { CoverView, CoverImage } from '@tarojs/components';
import styles from './index.scss';

const list = [
  {
    pagePath: '/pages/home/index',
    text: '首页',
    iconPath: '../assets/icn_tab_home_normal.png',
    selectedIconPath: '../assets/icn_tab_home_focus.png',
  },
  {
    pagePath: '/pages/classify/index',
    text: '分类',
    iconPath: '../assets/icn_tab_home_normal.png',
    selectedIconPath: '../assets/icn_tab_home_normal.png',
  },
  {
    pagePath: '/pages/profile/index',
    text: '我的',
    iconPath: '../assets/icn_tab_my_normal.png',
    selectedIconPath: '../assets/icn_tab_my_focus.png',
  },
];

class CustomTabBar extends React.Component {
  state = {
    // 建立一个全局变量储存selectedIndex
    // 创建方法可以按照自己的方法或taro提供的示例
    // 当然没有这个全局变量也可以解决问题
    // selected: global.globalData.selectedIndex,
  };

  switchTab = (item, index) => {
    const url = item.pagePath;
    // global.globalData.selectedIndex = index;
    this.setState({ selected: index });
    Taro.switchTab({ url });
  };

  shouldComponentUpdate = (_nextProps, nextState) => {
    return this.state.selected !== nextState.selected;
  };

  render() {
    return (
      <CoverView className='tabBar'>
        <CoverView className='tabBarBorder' />
        {list.map((item, index) => {
          const isSelected = this.state.selected === index;
          return (
            <CoverView
              className='tabBarItem'
              onClick={() => this.switchTab(item, index)}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage src={isSelected ? item.selectedIconPath : item.iconPath} />
              <CoverView
                style={{
                  color: isSelected ? 'rgba(0, 162, 0, 1)' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}

export default CustomTabBar;