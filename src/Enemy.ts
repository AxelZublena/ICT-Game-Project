/// <reference path="Character.ts" />

class Enemy extends Character{

    constructor(image: string, canvas: HTMLCanvasElement) {
        super(image, canvas);
        this.canvas = canvas;
        // this.image = this.loadNewImage(image);
        this.speed = 4;


    }

    /**
     * Draws the enemies during each frame
     * @param ctx
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        
    };

    public collidesWithPlayer = (a: Enemy, b: Player) => {
        //if () {
            //return true;
        //}
        return false;
    };

    
}
