import * as PIXI from "pixi.js";
import { interval } from "rxjs";
import Victor from "victor";

export default class Gun {

    app: any;
    player: any;
    bullets:any = [];
    bulletSpeed = 12;
    interval!: NodeJS.Timeout;
    velocity!: Victor;
    maxBullets = 3;

    constructor(app:any,player:any){
        this.app = app;
        this.player = player;
    }

    fire(){

        if(this.bullets.length >= this.maxBullets){
            let b = this.bullets.shift();
            this.app.stage.removeChild(b);
        }

        this.bullets.forEach((b:any) => this.app.stage.removeChild(b));

        this.bullets = this.bullets.filter(
            (b:any) => 
            Math.abs(b.position.x) < this.app.screen.width &&
            Math.abs(b.position.y) < this.app.screen.height
        );

        this.bullets.forEach((b:any) => this.app.stage.addChild(b));

        const bullet  = new PIXI.Graphics();
        bullet.beginFill(0xffffff);
        bullet.drawCircle(3, 3, 3);
        bullet.endFill();

        // const bullet = new PIXI.Sprite(PIXI.Texture.WHITE);
        // bullet.anchor.set(0.5);
        bullet.position.set(this.player.position.x - 20,this.player.position.y - 20);
        // bullet.width = bullet.height = 12;
        // bullet.tint = 0xea985d;
        bullet.angle = this.player.rotation;
        // this.app.stage.addChild(player);

        // const bullet = new PIXI.Graphics();
        // bullet.position.set(this.player.position.x,this.player.position.y);
        // bullet.beginFill(0x0000ff,1);
        // bullet.drawCircle(0,0,12);
        // bullet.endFill();
        let angle = this.player.rotation;
        // bullet.velocity = new Victor(
        //     Math.cos(angle),
        //     Math.sin(angle)
        // ).multiplyScalar(this.bulletSpeed);
        this.bullets.push(bullet);
        this.app.stage.addChild(bullet);

    }

    set shoot(shooting: any){
        if(shooting){
            this.fire();
            this.interval = setInterval(() => this.fire(),500);
        } else {
            clearInterval(this.interval);
        }
    }

    update() {
        this.bullets.forEach((b:any) => {

            let angle = b.angle;
            let velocity = new Victor(
                Math.cos(angle),
                Math.sin(angle)
            ).multiplyScalar(this.bulletSpeed);
            b.position.set(b.position.x + velocity.x, b.position.y + velocity.y)}
        );
    }

}