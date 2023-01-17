import { lstat } from 'fs';
import * as PIXI from 'pixi.js';
import Victor from 'victor';
import Gun from './Gun';

export default class Player {
    app: any;
    object:any;
    gun:any;
    lastMouseButton!: number;
    healthBar:any;
    health = 100;
    dead = false;

    constructor(app:any,sheet:any) {
        this.app = app;
        this.createPlayer(app,sheet);
        this.createHealthBar();
    }

    createPlayerObject(app:any,flip:boolean){

        var texture1 = PIXI.Texture.from('assets/hero_flip.png');
        // const sprite1 = new Sprite(texture);

        // if(flip === true){
        var texture2 = PIXI.Texture.from('assets/hero.png');
        // }

        // const player = new PIXI.Sprite(texture);
        // player.anchor.set(0.5);
        // player.position.set(app.screen.width / 2, app.screen.height / 2);
        // player.width = player.height = 4*32;
        // player.tint = 0xea985d;

        if(flip === true){
            return texture1;
        }else{
            return texture2;
        }

    }

    createPlayer(app:any, sheet:any) {

        // app.Loader

        // var sheet = PIXI.Assets.load("assets/hero_male.json").spritesheet;

        // const sheet = await PIXI.Assets.load("assets/hero_male.json");
    
        let squareWidth = 32;

        // const texture = PIXI.Texture.from('assets/hero.png');
        // const sprite1 = new Sprite(texture);

        // const player = new PIXI.Sprite(texture);
        this.object = new PIXI.AnimatedSprite(sheet.animations["idle"]);
        this.object.animationSpeed=0.1;
        this.object.play();
        this.object.anchor.set(0.5);
        this.object.position.set(app.screen.width / 2, app.screen.height / 2);
        this.object.width = this.object.height = 4*squareWidth;
        this.object.tint = 0xea985d;
        this.app.stage.addChild(this.object);
        this.lastMouseButton = 0;
        this.gun = new Gun(app,this.object);
        const player=this.object;
    
        document.addEventListener('keydown', onKeyDown);
    
        function onKeyDown(key:any) {
          if (key.keyCode === 38) {
                  player.position.y -= 4;
          }
    
          if (key.keyCode === 39) {
                  player.position.x += 4;
          }
    
          if (key.keyCode === 37) {
                  player.position.x -= 4;
          }
    
          if (key.keyCode === 40) {
                  player.position.y += 4;
          }
        }

        return this;
    
      }

    attack(){
        this.health -= 1;
        this.healthBar.height = 
        (this.health / 100) * 100;
        if(this.health <= 0){
            this.dead = true;
        }
    }

    createHealthBar(){
        const margin = 16;
        const barHeight = 100;
        this.healthBar = new PIXI.Graphics();
        this.healthBar.beginFill(0Xff000);
        this.healthBar.innerWidth = 10;
        this.healthBar.drawRect(
            margin,
            this.healthBar.innerWidth,
            this.healthBar.innerWidth,
            barHeight
        );
        this.healthBar.endFill();
        this.healthBar.zIndex = 1;
        this.app.stage.sortableChildren = true;
        this.app.stage.addChild(this.healthBar);
        
    }

    update(){

        if(this.object==null){
            return;
        }

        const mouse = this.app.renderer.plugins['interaction'].rootPointerEvent;
        const cursorPosition = this.app.renderer.plugins['interaction'].rootPointerEvent.global;
        let angle = Math.atan2(
        cursorPosition.y - this.object.position.y,
        cursorPosition.x - this.object.position.x
        );
        this.object.rotation = angle;

        // if(cursorPosition.x < this.object.position.x){

        //     this.object._texture = this.createPlayerObject(this.app,true);

        //     // this.object.rotation -= 2;

        //     this.object.scale.x *= -1;

        //     // this.object.setTexture(this.createPlayerObject(this.app,true));

        // }else{
        //     // this.object.scale.x *= -1;

            

        //     this.object._texture = this.createPlayerObject(this.app,false);
        //     this.object.scale.x *= -1;

        // }

        if(mouse.buttons !== this.lastMouseButton){
            this.attack();
            this.gun.shoot = mouse.buttons !== 0;
            this.lastMouseButton = mouse.buttons;
        }
        this.gun.update();
    }

}