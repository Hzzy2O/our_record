// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')


// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

const table = db.collection('days');

// function getDay(year,month){
//     var d = new Date(year,month,1,0,0,0);
//     var yD = new Date(d-1000);  //yD是前一天
//     return yD.getDate();
//   }
//   var en_mon_arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
//   for (let i = 1; i <= 12; i++) {
//     for(let j = getDay(2021,i);j>0;j--){
//       table.add({
//         data:{
//           bt_month:i,
//           bt_year:2021,
//           day:j,
//           title:'',
//           content:'',
//           icon:'',
//           text_style:null,
//           location:null
//         }
//       })
//       .then(res=>console.info(res)).catch(err=>console.warn(err))
//     }
//   }
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看
  
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

