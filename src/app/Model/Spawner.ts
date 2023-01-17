export default class Spawner {
    maxSpawns = 30;
    create: any;
    zombies:any = [];

    constructor(create:any){
        const spawnInterval = 100;
        this.create = create;
        setInterval(() => this.spawn(), spawnInterval);
    }

    spawn(){
        if(this.spawn.length <= this.maxSpawns){
            let s=this.create();
            this.zombies.push(s);
        }
    }

}