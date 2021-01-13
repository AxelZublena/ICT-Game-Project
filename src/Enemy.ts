/// <reference path="Character.ts" />

class Enemy extends Character{

    constructor(image: string, canvas: HTMLCanvasElement) {
        super(image, canvas);
        this.canvas = canvas;
        this.speed = 4;

        this.sprites = [
			"./assets/img/enemy/skeleton-move_0.png",
			"./assets/img/enemy/skeleton-move_1.png",
			"./assets/img/enemy/skeleton-move_2.png",
			"./assets/img/enemy/skeleton-move_3.png",
			"./assets/img/enemy/skeleton-move_4.png",
			"./assets/img/enemy/skeleton-move_5.png",
			"./assets/img/enemy/skeleton-move_6.png",
			"./assets/img/enemy/skeleton-move_7.png",
			"./assets/img/enemy/skeleton-move_8.png",
			"./assets/img/enemy/skeleton-move_9.png",
			"./assets/img/enemy/skeleton-move_10.png",
			"./assets/img/enemy/skeleton-move_11.png",
			"./assets/img/enemy/skeleton-move_12.png",
			"./assets/img/enemy/skeleton-move_13.png",
			"./assets/img/enemy/skeleton-move_14.png",
			"./assets/img/enemy/skeleton-move_15.png",
			"./assets/img/enemy/skeleton-move_16.png",
		];

		this.sprites_left = [
			"./assets/img/enemy/left/skeleton-move_0.png",
			"./assets/img/skeleton-move_1.png",
			"./assets/img/skeleton-move_2.png",
			"./assets/img/skeleton-move_3.png",
			"./assets/img/skeleton-move_4.png",
			"./assets/img/skeleton-move_5.png",
			"./assets/img/skeleton-move_6.png",
			"./assets/img/skeleton-move_7.png",
			"./assets/img/skeleton-move_8.png",
			"./assets/img/skeleton-move_9.png",
			"./assets/img/skeleton-move_10.png",
			"./assets/img/skeleton-move_11.png",
			"./assets/img/skeleton-move_12.png",
			"./assets/img/skeleton-move_13.png",
			"./assets/img/skeleton-move_14.png",
			"./assets/img/skeleton-move_15.png",
			"./assets/img/skeleton-move_16.png",
		];

		this.sprites_right = [
			"./assets/img/skeleton-move_0.png",
			"./assets/img/skeleton-move_1.png",
			"./assets/img/skeleton-move_2.png",
			"./assets/img/skeleton-move_3.png",
			"./assets/img/skeleton-move_4.png",
			"./assets/img/skeleton-move_5.png",
			"./assets/img/skeleton-move_6.png",
			"./assets/img/skeleton-move_7.png",
			"./assets/img/skeleton-move_8.png",
			"./assets/img/skeleton-move_9.png",
			"./assets/img/skeleton-move_10.png",
			"./assets/img/skeleton-move_11.png",
			"./assets/img/skeleton-move_12.png",
			"./assets/img/skeleton-move_13.png",
			"./assets/img/skeleton-move_14.png",
			"./assets/img/skeleton-move_15.png",
			"./assets/img/skeleton-move_16.png",
		];

		this.sprites_downwards = [
			"./assets/img/skeleton-move_0.png",
			"./assets/img/skeleton-move_1.png",
			"./assets/img/skeleton-move_2.png",
			"./assets/img/skeleton-move_3.png",
			"./assets/img/skeleton-move_4.png",
			"./assets/img/skeleton-move_5.png",
			"./assets/img/skeleton-move_6.png",
			"./assets/img/skeleton-move_7.png",
			"./assets/img/skeleton-move_8.png",
			"./assets/img/skeleton-move_9.png",
			"./assets/img/skeleton-move_10.png",
			"./assets/img/skeleton-move_11.png",
			"./assets/img/skeleton-move_12.png",
			"./assets/img/skeleton-move_13.png",
			"./assets/img/skeleton-move_14.png",
			"./assets/img/skeleton-move_15.png",
			"./assets/img/skeleton-move_16.png",
		];

    }

    /**
     * Draws the enemies during each frame
     * @param ctx
     */
    public draw = (ctx: CanvasRenderingContext2D) => {

        ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width/1.5,
			this.image.height/1.5
		);
    };

    public collidesWithPlayer = (a: Enemy, b: Player) => {
        //if () {
            //return true;
        //}
        return false;
    };

    
}
