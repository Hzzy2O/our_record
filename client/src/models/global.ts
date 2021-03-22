// import { Subscription, Effect } from 'dva';
import { Reducer} from "redux";
import Taro from '@tarojs/taro';
import {tabList} from "../utils/common"

export interface GlobalModelState {
  // 定义state
  loading:boolean;
  currentTab:number;
  showBar:boolean;
  showNewDianry:boolean;
  prevTab:number;
  dataSel:string
}

export interface GlobalModelType {
  namespace: 'global',
  state: GlobalModelState,
  effects: {
    // xxxxx: Effect xxxx是effect的名字
  },
  reducers: {
    setTab: Reducer<GlobalModelState>,
    changeBarShow: Reducer<GlobalModelState>,
    setdataSel: Reducer<GlobalModelState>,
  };
  subscriptions: {
    //xxx: Subscription
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    loading:false,
    currentTab:0,
    showBar:false,
    showNewDianry:false,
    prevTab:0,
    dataSel:''
  },
  effects: {
    // effect函数
  },
  subscriptions: {
    // 订阅
  },
  reducers: {
    // reducer
    setTab(state:GlobalModelState,{payload}){
      payload.prevTab = state.currentTab|0;
      let {currentTab,dataSel} = payload;
      Taro.switchTab({url:tabList[currentTab].pagePath});
      payload.showBar = currentTab ===1 ? false : true
      payload.dataSel = dataSel || ''
      return ({...state,...payload})
    },
    changeBarShow(state,{payload}){
      return ({...state,...payload})
    },
    setdataSel(state,{payload}){
      return ({...state,...payload})
    },
  }
};

export default GlobalModel;