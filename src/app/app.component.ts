import { Component } from '@angular/core';
import { appendFile } from 'fs';
import * as PIXI from 'pixi.js';
import Victor from 'victor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor () {};

  ngOnInit(): void {

    this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

    this.app = new PIXI.Application({
      view:this.canvas,
      width:4*this.canvas.width,
      height:4*this.canvas.height
      // width: window.innerWidth,
      // height: window.innerHeight
    });

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    this.app.ticker.add((delta) => {
      const cursorPosition = this.app.renderer.plugins['interaction'].rootPointerEvent.global;
      let angle = Math.atan2(
        cursorPosition.y - this.player.position.y,
        cursorPosition.x - this.player.position.x
      ) +
      Math.PI / 2;
      this.player.rotation = angle;

      let e = new Victor(this.graphics.position.x,this.graphics.position.y);
      let s = new Victor(this.player.position.x,this.player.position.y);

      if (e.distance(s) < this.graphics.width/2) {
        let r = this.randomEntryPoint();
        this.graphics.position.set(r.x,r.y);
      }

      let d = s.subtract(e);
      let v = d.normalize().multiplyScalar(2);
      this.graphics.position.set(this.graphics.position.x + v.x, this.graphics.position.y + v.y);

    });



    this.graphics = new PIXI.Graphics();

  this.graphics.beginFill(0xFFFF00);
  
  // set the line style to have a width of 5 and set the color to red
  this.graphics.lineStyle(5, 0xFF0000);
  
  // draw a rectangle
  this.graphics.drawRect(0, 0, 30, 20);

  let p = this.randomEntryPoint();

  this.graphics.position.set(p.x,p.y);

    this.createPlayer(this.app);

    this.app.stage.addChild(this.graphics);

  };

  title = 'zombie-shooter';

  canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

  app!: PIXI.Application;

  graphics = new PIXI.Graphics();

  player!:any;

  canvasWidth!:any;
  canvasHeight!:any;


  // creating player

  createPlayer(app:any) {
    
    let squareWidth = 32;
    const player = new PIXI.Sprite(PIXI.Texture.WHITE);
    player.anchor.set(0.5);
    player.position.set(app.screen.width / 2, app.screen.height / 2);
    player.width = player.height = squareWidth;
    player.tint = 0xea985d;
    this.player=player;
    this.app.stage.addChild(this.player);

  }
  
  randomEntryPoint() {
    let edge = Math.floor(Math.random() * 4);
    let point = new Victor(0,0);
    switch (edge) {
      case 0:
        point.x = this.canvasWidth * Math.random();
        point.y = 0;
        break;
      case 1:
        point.x = this.canvasWidth;
        point.y = this.canvasHeight * Math.random();
        break;
      case 2:
        point.x = this.canvasWidth * Math.random();
        point.y = this.canvasHeight;
        break;
      case 3:
        point.x = 0;
        point.y = this.canvasHeight * Math.random();
        break;
      default:
        break;
    }
    return point;
  }



  

}

