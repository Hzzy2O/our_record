import Taro from '@tarojs/taro'
import {globalData} from "./common"

export const getCanvasCtx:any = async (eleId = "",{width,height}, delay = 200) => {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        clearTimeout(t);
        Taro.createSelectorQuery()
          .select(`#${eleId}`)
          .fields({ node: true })
          .exec((res) => {
            if (res && res[0] && res[0].node) {
              const canvas = res[0].node;
              const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height
              resolve({ canvas, ctx });
            } else {
              reject({});
            }
          });
      }, delay);
    });
  };

  

export class Circle{
  x:number;
  y:number;
  h:number;
  c:number;
  vh:number;
  vx:number;
  vy:number;

  constructor(x,y,h,c){
      this.x = x;
      this.y = y;
      this.h = h;
      this.vh = this.h/25;
      this.vx = -10+Math.random()*15;
      this.vy = -10+Math.random()*15;
      this.c = c;
  }
  update(){
      this.x+=this.vx;
      this.y+=this.vy;
      this.h-=this.vh;
  }
}