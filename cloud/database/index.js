const { rejects } = require("assert");
const { resolve } = require("path");

const db = wx.cloud.database()

const table = db.collection('todos');

exports.add = (data) =>{
  return table.add({
    // data 字段表示需新增的 JSON 数据
    data
  })
}

exports.update = data => {
  return table
}