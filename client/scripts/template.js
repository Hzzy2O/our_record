/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 * author: jiemo
 * date: 2018.11.9 
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
import './index.scss'
import Loading from "../../components/loading/index.weapp"

// @connect(({ ${dirName} }) => ({
//     ...${dirName},
// }))

class ${capPirName} extends Component {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View className='${dirName}'>
          
      </View>
    )
  }
}

export default ${capPirName}
`

// scss文件模版
const scssTep = `@import "../../assets/scss/variables";

.${dirName} {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
const configTep = `export default {
  navigationStyle:'custom'
}
`
// 接口请求模板
const serviceTep = `import Api from '../../utils/request'

export const testApi = data => Api.test(
  data
)
`


fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`index.tsx`, indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
fs.writeFileSync('index.config.ts', configTep); // config
// fs.writeFileSync('service.ts', serviceTep); // service
// fs.writeFileSync('model.ts', modelTep); // model
// fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);