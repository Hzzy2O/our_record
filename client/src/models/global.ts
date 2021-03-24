import { Subscription, Effect } from 'dva';
import { Reducer} from "redux";
import Taro from '@tarojs/taro';
import {tabList} from "../utils/common"
import { pull } from 'lodash';
import {getDianryList} from "../apis/index"

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
    getDiaryList: Effect 
  },
  reducers: {
    setTab: Reducer<GlobalModelState>,
    changeBarShow: Reducer<GlobalModelState>,
    setdataSel: Reducer<GlobalModelState>,
    setLoading: Reducer<GlobalModelState>,
  };
  subscriptions: {
    //xxx: Subscription
  }
}
const action = (type,action) => ({type,action})
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
    *getDiaryList(_,{select, call, put}){
      yield put(action('setLoading',{loading:true}))
      const res = yield call(getDianryList)
    }
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
    setLoading(state,{payload}){
      return ({...state,...payload})
    }
  }
};

export default GlobalModel;