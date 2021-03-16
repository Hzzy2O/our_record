import Taro from '@tarojs/taro'

export const upload = async (path) => {
  let exc = /\.[^\.]+$/.exec(path);
  let suffix = exc? exc[0] : '.jpg';
  return await Taro.cloud.uploadFile({
    cloudPath:Date.now()+suffix,
    filePath:path
  }).then(res=>{
    return res.fileID
  })
}

export const getPic = pic => new Promise((reslove)=>{
  let isArr = Array.isArray(pic)
  Taro.cloud.getTempFileURL({
    fileList:isArr?pic:[pic],
    success(res){
      let picArr = res.fileList.map(e=>e.tempFileURL);
      reslove(isArr ? picArr : picArr[0])
    }
  })
})