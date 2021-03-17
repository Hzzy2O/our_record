export var globalData: any = {}

export const COLORS :string[] = ['#65DCFF','#65BCFF','#658EFF','#6D65FF','#A065FF','#FF65CE','#FF659E','#FF6565'
  ,'#FF8965','#FFB565','#FFDF00','#B8E986','#86E99E','#86E9D0','#86DDE9','#D3D2D3','#B7B7B7','#999999','#6C6C6C','#373737']

export const getNowDate = ()=>{
  let d = new Date()
  const [year,month,date,day] = [d.getFullYear(),d.getMonth()+1,d.getDate(),d.getDay()]
  return {year,month,date,day}
}

export const getDayOfWeek = (day) => {
  let arr = ['一','二','三','四','五','六','日'];
  return '周'+arr[day-1]
}

