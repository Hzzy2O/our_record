import Taro from '@tarojs/taro'

const requset = (name:string,db?:string,method?:string,data?:any):any => new Promise((reslove,reject)=>{
  Taro.cloud
  .callFunction({
    name,
    data: {
      func_name: (method&&method.toLocaleLowerCase()) || null,
      db_name: db || null,
      data: data || null
    }
  })
  .then(res=>{
    reslove(res.result)
  })
  .catch(reject)
})

export default requset