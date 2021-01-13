/// <reference path="Character.ts" />

class Enemy extends Character{

    constructor(image: string, canvas: HTMLCanvasElement, xPos: number, yPos: number) {
        super(image, canvas);
        this.canvas = canvas;
		this.speed = this.randomNumber(1, 2.5);
		
		this.xPos = xPos;
		this.yPos = yPos;

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
			"./assets/img/enemy/left/skeleton-move_1.png",
			"./assets/img/enemy/left/skeleton-move_2.png",
			"./assets/img/enemy/left/skeleton-move_3.png",
			"./assets/img/enemy/left/skeleton-move_4.png",
			"./assets/img/enemy/left/skeleton-move_5.png",
			"./assets/img/enemy/left/skeleton-move_6.png",
			"./assets/img/enemy/left/skeleton-move_7.png",
			"./assets/img/enemy/left/skeleton-move_8.png",
			"./assets/img/enemy/left/skeleton-move_9.png",
			"./assets/img/enemy/left/skeleton-move_10.png",
			"./assets/img/enemy/left/skeleton-move_11.png",
			"./assets/img/enemy/left/skeleton-move_12.png",
			"./assets/img/enemy/left/skeleton-move_13.png",
			"./assets/img/enemy/left/skeleton-move_14.png",
			"./assets/img/enemy/left/skeleton-move_15.png",
			"./assets/img/enemy/left/skeleton-move_16.png",
		];

		this.sprites_right = [
			"./assets/img/enemy/right/skeleton-move_0.png",
			"./assets/img/enemy/right/skeleton-move_1.png",
			"./assets/img/enemy/right/skeleton-move_2.png",
			"./assets/img/enemy/right/skeleton-move_3.png",
			"./assets/img/enemy/right/skeleton-move_4.png",
			"./assets/img/enemy/right/skeleton-move_5.png",
			"./assets/img/enemy/right/skeleton-move_6.png",
			"./assets/img/enemy/right/skeleton-move_7.png",
			"./assets/img/enemy/right/skeleton-move_8.png",
			"./assets/img/enemy/right/skeleton-move_9.png",
			"./assets/img/enemy/right/skeleton-move_10.png",
			"./assets/img/enemy/right/skeleton-move_11.png",
			"./assets/img/enemy/right/skeleton-move_12.png",
			"./assets/img/enemy/right/skeleton-move_13.png",
			"./assets/img/enemy/right/skeleton-move_14.png",
			"./assets/img/enemy/right/skeleton-move_15.png",
			"./assets/img/enemy/right/skeleton-move_16.png",
		];

		this.sprites_downwards = [
			"./assets/img/enemy/downwards/skeleton-move_0.png",
			"./assets/img/enemy/downwards/skeleton-move_1.png",
			"./assets/img/enemy/downwards/skeleton-move_2.png",
			"./assets/img/enemy/downwards/skeleton-move_3.png",
			"./assets/img/enemy/downwards/skeleton-move_4.png",
			"./assets/img/enemy/downwards/skeleton-move_5.png",
			"./assets/img/enemy/downwards/skeleton-move_6.png",
			"./assets/img/enemy/downwards/skeleton-move_7.png",
			"./assets/img/enemy/downwards/skeleton-move_8.png",
			"./assets/img/enemy/downwards/skeleton-move_9.png",
			"./assets/img/enemy/downwards/skeleton-move_10.png",
			"./assets/img/enemy/downwards/skeleton-move_11.png",
			"./assets/img/enemy/downwards/skeleton-move_12.png",
			"./assets/img/enemy/downwards/skeleton-move_13.png",
			"./assets/img/enemy/downwards/skeleton-move_14.png",
			"./assets/img/enemy/downwards/skeleton-move_15.png",
			"./assets/img/enemy/downwards/skeleton-move_16.png",
		];

    }

    /**
     * Draws the enemies during each frame
     * @param ctx
     */
    public draw = (ctx: CanvasRenderingContext2D, player: Player) => {

        ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width/1.5,
			this.image.height/1.5
		);

		this.zombieMovement(player);

		this.frameCounter(17);
    };

    public collidesWithPlayer = (a: Enemy, b: Player) => {
        if (a.getPositionX() == b.getPositionX() || a.getPositionY() == b.getPositionY()) {
			return true;
        }
        return false;
    };

    private zombieMovement = (player: Player) => {

		if (player.getPositionX() < this.xPos) {
			this.xPos -= this.speed;
			this.image = this.loadNewImage(this.sprites_left[this.counter]);
			if (player.getPositionY() < this.yPos) {
				this.yPos -= this.speed;
				this.image = this.loadNewImage(this.sprites[this.counter]);
			}
		}

		if (player.getPositionX() > this.xPos) {
			this.xPos += this.speed;
			this.image = this.loadNewImage(this.sprites_right[this.counter]);
			if (player.getPositionY() > this.yPos) {	
				this.yPos += this.speed;
				this.image = this.loadNewImage(this.sprites_downwards[this.counter]);
			}
		}

		



	};
}
