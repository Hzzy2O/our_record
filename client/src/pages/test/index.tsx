import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text,Canvas,CoverView } from '@tarojs/components'
import {getCanvasCtx,Circle} from "../../utils/canvas"
import "./index.scss"
// import "./sketch"
// import "./mouse"

let Heart = function(ctx, x, y, size) {
  this.ctx = ctx;
  this.x= x;
  this.y = y;
  this.size = size;
  this.vh = this.size/25;
  this.vx = -10+Math.random()*15;
  this.vy = -10+Math.random()*15;
  this.vertices = getVector();
  
  function getVector() {
      let vertices:any = [];

      // console.log(this == win) //true　
      for(let i = 0; i < 50; i++) {
          let step = i/50 * (Math.PI * 2);
          let vector = {
              x : size * (16 * Math.pow(Math.sin(step), 3)),
              y : size * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2.1 * Math.cos(3 * step) - Math.cos(4 * step))
          }
          vertices.push(vector);
      }

      return vertices;
  };
}

Heart.prototype.draw = function() {
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(Math.PI);
  this.ctx.scale(.1,.1);
  let vertices = this.vertices
  for(let i = 0; i < vertices.length; i++) {
    let vector = vertices[i];
    this.ctx.lineTo(vector.x, vector.y);
  }
  
  this.ctx.fillStyle = 'hotpink';
  this.ctx.fill();
  
  this.ctx.strokeStyle = "hotpink";
  this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.restore();
};
Heart.prototype.update = function() {
  this.x+=this.vx;
  this.y+=this.vy;
  this.h-=this.vh;
}
let clientHeight,clientWidth
let ratio; //根据尺寸动态计算 1px换算成多少rpx
export default class Index extends Component {
  
  state = {
    cir :[] as any
  }
  draw(e){
    e = e.touches[0];
    let colo = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
    for(let i=0;i<2;i++){  
      let rdh = Math.random()*10+10;
      let r = parseInt(Math.random()*colo.length) ;                
      cir.push(new Circle(e.x, e.y,rdh,"#fff"));
    }
  }
  //绘制背景
  drawProgressbg = async () => {
    //stepone, steptwo, size, width, colorone, colortwo
      Taro.getSystemInfo({
        success: (res) => {
          clientWidth = res.windowWidth;
          clientHeight = res.windowHeight;
          //屏幕宽度 375px = 750rpx, 1px = rpx
          // 1px = （750 / 屏幕宽度）rpx；
          // 1rpx = （屏幕宽度 / 750）px;
          ratio = 550 / clientWidth;
        }
      });
    const {cir} = this.state;
    let _this = this;
      // 使用 .createContext 获取绘图上下文 context
      const { canvas, ctx } = await getCanvasCtx('canvas',{width:clientWidth,height:clientHeight});
      function renderC(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            cir.forEach((e,i) => {
              ctx.beginPath();
                ctx.arc(e.x,e.y,e.h,0,Math.PI*2,false);
                ctx.lineWidth = 5;
                ctx.strokeStyle = e.c;
                ctx.fillStyle = e.c;
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                e.update();
                if(e.h<1){
                    cir.splice(i,1);
                }
            });
            _this.setState({
              cir
            })
            canvas.requestAnimationFrame(renderC);
        }
        renderC();
  };

  getCanvasCtx = async (eleId = "", delay = 200) => {
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
              canvas.width = clientWidth;
              canvas.height = clientHeight
              resolve({ canvas, ctx });
            } else {
              reject({});
            }
          });
      }, delay);
    });
  };
  componentDidMount(){
    this.drawProgressbg()
    console.log(Taro)
  }
  componentWillUnmount(){

  }
  test(){
    console.log(1)
  }
  render () {
    // this.drawProgressbg()
    // console.log(document.body)
    return (
      <View className='test'>
        <Canvas style={{position:"absolute",width:clientWidth+"PX",height:clientHeight+"PX"}} onTouchStart={this.draw.bind(this)} onTouchMove={this.draw.bind(this)} type="2d" id='canvas'></Canvas>
        <View style={{height:'140PX'}} onTouchStart={this.test.bind(this)}>
          <Text>todo</Text>
        </View>
      </View>
    )
  }
}


// const progData = {
//         stepone: 2,//底层圆进度，默认满圆
//         steptwo: 1,//上层圆进度
//         size: 1.2,//大小
//         width: 8,//宽度
//         colorone: "#E7E7E7",//底层圆颜色
//         colortwo: "#FFB17D",//上层圆颜色
//         idone: "bigdata_pro0101",//底层圆id(可用随机数)
//         idtwo: "bigdata_pro0102",//上层圆id
//         start: 1,//开始位置（不需要可屏蔽，相对应progress里面做相应屏蔽）
//         end: 1//控制整圆or半圆
//       };