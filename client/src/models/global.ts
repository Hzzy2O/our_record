import { Subscription, Effect } from 'dva';
import { Reducer} from "redux";

export interface GlobalModelState {
  // 定义state
  loading:boolean;
  currentTab:number;
  showBar:boolean;
  showNewDianry:boolean;
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
    showNewDianry:false
  },
  effects: {
    // effect函数
  },
  subscriptions: {
    // 订阅
  },
  reducers: {
    // reducer
    setTab(state,action){
      return ({...state,...action.payload})
    },
    changeBarShow(state,action){
      return ({...state,...action.payload})
    },
  }
};

export default GlobalModel;