import { Component } from '@angular/core';
import { appendFile } from 'fs';
import * as PIXI from 'pixi.js';
import Victor from 'victor';
import Player from './Model/Player';
import Spawner from './Model/Spawner';
import Zombie from './Model/Zombie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor () {};

  async ngOnInit() {

    await this.loadAssets();

    this.canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

    // document.addEventListener('keydown', this.onKeyDown);

    this.app = new PIXI.Application({
      view:this.canvas,
      width:4*this.canvas.width,
      height:5*this.canvas.height,
      // width: window.innerWidth,
      // height: window.innerHeight
      backgroundColor:0x120f0d
    });

    this.app.ticker.add((delta) => {

      this.player.update();

      this.zombieSpawner.zombies.forEach( (zombie:Zombie) => zombie.update(this.player));

      this.bulletHit(this.player.gun.bullets,this.zombieSpawner.zombies);

    });

    // await this.loadAssets(this.app);

  this.zombieSpawner = new Spawner(() => new Zombie(this.app,this.player));

  this.player = new Player(this.app,this.sheet);

  };

  bulletHit(bullets:any,zombies:any){
    bullets.forEach((bullet:any) => {
      zombies.forEach((zombie:any, index:any) => {
        let dx = zombie.object.position.x - bullet.position.x;
        let dy = zombie.object.position.y - bullet.position.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < 40){
          zombies.splice(index,1);
          zombie.kill();
        }
      })
    })
  }

  title = 'zombie-shooter';

  canvas = document.getElementById("mycanvas") as HTMLCanvasElement;

  app!: PIXI.Application;

  player!:any;
  zombieSpawner!:any;
  sheet!:any;
  
  async loadAssets() {
    // return new Promise(async (resolve,reject)=>{

      this.sheet = await PIXI.Assets.load("assets/hero_male.json");

    // });
  }

}

