import React from "react";
import Taro, { Component } from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import { getCanvasCtx, Circle } from "../../utils/canvas"
import { globalData } from "../../utils/common"
import classnames from "classnames";
import "./index.scss"
let cir: any[] = []
class CanvasCircle extends React.Component {

  
  draw(e) {
    e = e.touches[0];
    // const {cir} = this.state;
    let colo = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
    for (let i = 0; i < 2; i++) {
      let rdh = Math.random() * 10 + 10;
      let r = Math.random() * colo.length | 0;
      cir.push(new Circle(e.x, e.y, rdh, colo[r]));
    }
  }
  //绘制背景
  drawProgressbg = async () => {
    // const {cir} = this.state;
    // 使用 .createContext 获取绘图上下文 context
    let width = globalData.windowWidth, height = globalData.windowHeight;
    const { canvas, ctx } = await getCanvasCtx('canvas', { width, height });
    function renderC() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cir.forEach((e, i) => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.h, 0, Math.PI * 2, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = e.c;
        ctx.fillStyle = e.c;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        e.update();
        if (e.h < 1) {
          cir.splice(i, 1);
        }
      });
      canvas.requestAnimationFrame(renderC);
    }
    renderC();
  };
  constructor(props) {
    super(props);

    
  }
  state = {
    istouch:false
  }
  componentDidMount() {
    this.drawProgressbg()
  }
  config = {};

  // 此处省略n行无用代码

  render() {
    const {istouch} = this.state;
    const cls = classnames({
      'canvas':true,
      'canavs-top':istouch
    })
    return (
      <Canvas className={cls} style={{ width: globalData.windowWidth + "PX", height: globalData.windowHeight + "PX" }} onTouchStart={this.draw.bind(this)} onTouchMove={this.draw.bind(this)} type="2d" id='canvas'></Canvas>
    )
  }
}

export default CanvasCircle;