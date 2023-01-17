import * as PIXI from 'pixi.js';
import Victor from 'victor';
import Player from './Player';

export default class Zombie {
    app: any;
    object:any;


    canvas = document.getElementById("mycanvas") as HTMLCanvasElement;
    canvasWidth = this.canvas.width;
    canvasHeight = this.canvas.height;
    attacking: any;
    interval!: any;
    player:any;

    constructor(app:any,player:any) {
        this.app=app;
        this.player = player;
        this.createZombie();
    }

    createZombie(){

      var zombies = ['assets/zombies/zombie1.png','assets/zombies/zombie2.png','assets/zombies/zombie3.png','assets/zombies/zombie4.png','assets/zombies/zombie5.png'];

      const texture = PIXI.Texture.from(zombies[Math.floor(Math.random() * 5)]);
        // const sprite1 = new Sprite(texture);

        // const player = new PIXI.Sprite(texture);

      const zombie = new PIXI.Sprite(texture);
      zombie.anchor.set(0.5);
      // player.position.set(app.screen.width / 2, app.screen.height / 2);
      zombie.width = zombie.height = 80;
      zombie.tint = 0xea985d;
      let p = this.randomEntryPoint();
      zombie.position.set(p.x,p.y);

      this.app.stage.addChild(zombie);
      this.object=zombie;
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

    attackPlayer(){
        if(this.attacking) return;
        this.attacking = true;
        this.interval = setInterval(() => this.player.attack(),500);
    }

    kill(){
        this.app.stage.removeChild(this.object);
        clearInterval(this.interval);
    }

    update(player:Player){
        let e = new Victor(this.object.position.x,this.object.position.y);
        let s = new Victor(player.object.position.x,player.object.position.y);

        if (e.distance(s) < this.object.width/2) {
            this.attackPlayer();
            return;
        }

        let d = s.subtract(e);
        let v = d.normalize().multiplyScalar(2);
        this.object.position.set(this.object.position.x + v.x, this.object.position.y + v.y);
    }

}