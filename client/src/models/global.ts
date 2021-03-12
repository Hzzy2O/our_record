import { Subscription, Effect } from 'dva';
import { Reducer} from "redux";

export interface GlobalModelState {
  // 定义state
}

export interface GlobalModelType {
  namespace: 'global',
  state: GlobalModelState,
  effects: {
    // xxxxx: Effect xxxx是effect的名字
  },
  reducers: {
    // xxxx: Reducer<GlobalModelState>
  };
  subscriptions: {
    //xxx: Subscription
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {

  },
  effects: {
    // effect函数
  },
  subscriptions: {
    // 订阅
  },
  reducers: {
    // reducer
  }
};

export default GlobalModel;