// 云函数入口文件
const cloud = require('wx-server-sdk')
// const dateCURD = require('./date')
cloud.init({env:'luv-diary-3gasftpi3ec96df4'})
const db = cloud.database();
const _ = db.command;
const monthCURD = require("./month") 
// 云函数入口函数
exports.main = async (event, context) => {
  const {func_name,data} = event;
  const info = {
    db:db,
    data,
    methods:func_name
  }

  let res = await monthCURD(info)
  return res
}