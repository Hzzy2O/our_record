
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import Theme from '@/utils/theme';
 
import {connect} from '@tarojs/redux'
import Loading from "../loading/index.weapp"

class BaseComponent extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
 
    };
  }
 
  config = {};
 
  // 此处省略n行无用代码
 
  render() {
    // let {modals} = this.props;
    // if(modals){
      return (
        <View className='baseComponent-container'>
          {/*页面主体代码都在children中*/}
          {this.props.children}
          
          {/*在这里可以添加一下公用的代码，如公共弹框，此处使用的BaseModal是一个自定义弹框组件，不是这次要讲的重点，这里就不贴代码了*/}
          <Loading>1</Loading>
        </View>
      )
    // }
 
  }
}

export default BaseComponent;