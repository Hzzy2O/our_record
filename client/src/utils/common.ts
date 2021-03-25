export var globalData: any = {}

export const COLORS :string[] = ['#65DCFF','#65BCFF','#658EFF','#6D65FF','#A065FF','#FF65CE','#FF659E','#FF6565'
  ,'#FF8965','#FFB565','#FFDF00','#B8E986','#86E99E','#86E9D0','#86DDE9','#D3D2D3','#B7B7B7','#999999','#6C6C6C','#373737']

export const getNowDate = (time = '') => {
  time = time.replace(/\-/g,'/')
  let d = time ? new Date(time+" 00:00") : new Date()
  const [year,month,date,day] = [d.getFullYear(),d.getMonth()+1,d.getDate(),d.getDay()]
  return {year,month,date,day}
}

export const getDayOfWeek = (day) => {
  let arr = ['日','一','二','三','四','五','六'];
  return '周'+arr[day]
}

export const tabList = [
  {
    pagePath: '/pages/index/index',
    iconPath: '../assets/home.png',
    selectedIconPath: '../assets/home_foc.png',
  },
  {
    pagePath:  '/pages/newDiary/index',
    iconPath: '../assets/add.png',
    selectedIconPath: '../assets/add.png',
  },
  {
    pagePath: '/pages/daysMatter/index',
    iconPath: '../assets/my.png',
    selectedIconPath: '../assets/my_foc.png',
  },
];

export function getRelativeTime(start,end) {
  //将日期转为分隔符为-的格式
  let start_date = new Date(start.replace(/-/g, "/"));
  let end_date = new  Date(end.replace(/-/g, "/"));
  let dateDiff = end_date.getTime() - start_date.getTime();
  // 计算出相差天数
  let days = Math.floor(dateDiff / (24 * 3600 * 1000));
 
  // 计算出小时数
  let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  let hours = Math.floor(residue1 / (3600 * 1000));
 
  // 计算相差分钟数
  let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  let minutes = Math.floor(residue2 / (60 * 1000));
 
  // 计算相差秒数
  let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  let seconds = Math.round(residue3 / 1000);
 
  let returnVal =
    ((days == 0) ? "" : days+"天") +
    ((hours == 0) ? "" : days+"时") +
    ((minutes == 0) ? "" : minutes+"分") +
    ((seconds == 0) ? "" : seconds+"秒");
 
  return returnVal;
}