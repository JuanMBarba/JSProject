export default class MovingObject{
    constructor(x, y, width, height, game){
        this.game = game
        this.width = width;
        this.height = height;
        this.vel = {
            x: 0,
            y: 0
        }
        this.pos ={
            x: x,
            y: y
        }
    }

    update(){
        
    }

    step(){
        this.update();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(ctx){
        ctx.fillStyle = "blue"
        // console.log(this.pos.x);
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

