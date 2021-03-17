import React from "react";
import Taro from '@tarojs/taro';
import { CoverView, CoverImage } from '@tarojs/components';
import  './index.scss';

const list = [
  {
    pagePath: '/pages/index/index',
    iconPath: '../assets/home.png',
    selectedIconPath: '../assets/home_foc.png',
  },
  {
    pagePath:  '/pages/newDinary/index',
    iconPath: '../assets/add.png',
    selectedIconPath: '../assets/add.png',
  },
  {
    pagePath: '/pages/daysMatter/index',
    iconPath: '../assets/my.png',
    selectedIconPath: '../assets/my_foc.png',
  },
];

class CustomTabBar extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    // 建立一个全局变量储存selectedIndex
    // 创建方法可以按照自己的方法或taro提供的示例
    // 当然没有这个全局变量也可以解决问题
    // selected: global.globalData.selectedIndex,
  };

  switchTab = (item, index) => {
    const url = item.pagePath;
    // global.globalData.selectedIndex = index;
    index!==1&&this.setState({ selected: index });
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
              key={index}
            >
              <CoverImage src={isSelected ? item.selectedIconPath : item.iconPath} />
              <CoverView
                style={{
                  color: isSelected ? 'rgba(0, 162, 0, 1)' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}

export default CustomTabBar;