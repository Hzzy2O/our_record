export type Month = {
  _id:string;
  month:number;
  color:string;
  desc:string;
  pic:string;
  days:number;
  bt_year:number;
  daysArr:any []; 
  count:any [];
}

export type Day = {
  _id:string;
  bt_month: number;
  bt_year: number;
  content: string
  day: number;
  icon: string
  location: any
  text_style: any
  title: string
}

export interface Owner{
  x:number;
}