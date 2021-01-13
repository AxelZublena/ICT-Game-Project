/// <reference path="Character.ts" />

class Player extends Character{
	
	constructor(image: string, canvas: HTMLCanvasElement) {
		super(image, canvas);
		this.speed = 5;

		this.sprites = [
			"./assets/img/player/survivor-move_knife_0.png",
			"./assets/img/player/survivor-move_knife_1.png",
			"./assets/img/player/survivor-move_knife_2.png",
			"./assets/img/player/survivor-move_knife_3.png",
			"./assets/img/player/survivor-move_knife_4.png",
			"./assets/img/player/survivor-move_knife_5.png",
			"./assets/img/player/survivor-move_knife_6.png",
			"./assets/img/player/survivor-move_knife_7.png",
			"./assets/img/player/survivor-move_knife_8.png",
			"./assets/img/player/survivor-move_knife_9.png",
			"./assets/img/player/survivor-move_knife_10.png",
			"./assets/img/player/survivor-move_knife_11.png",
			"./assets/img/player/survivor-move_knife_12.png",
			"./assets/img/player/survivor-move_knife_13.png",
			"./assets/img/player/survivor-move_knife_14.png",
			"./assets/img/player/survivor-move_knife_15.png",
			"./assets/img/player/survivor-move_knife_16.png",
			"./assets/img/player/survivor-move_knife_17.png",
			"./assets/img/player/survivor-move_knife_18.png",
			"./assets/img/player/survivor-move_knife_19.png"
		];

		this.sprites_left = [
			"./assets/img/player/left/survivor-move_knife_0.png",
			"./assets/img/player/left/survivor-move_knife_1.png",
			"./assets/img/player/left/survivor-move_knife_2.png",
			"./assets/img/player/left/survivor-move_knife_3.png",
			"./assets/img/player/left/survivor-move_knife_4.png",
			"./assets/img/player/left/survivor-move_knife_5.png",
			"./assets/img/player/left/survivor-move_knife_6.png",
			"./assets/img/player/left/survivor-move_knife_7.png",
			"./assets/img/player/left/survivor-move_knife_8.png",
			"./assets/img/player/left/survivor-move_knife_9.png",
			"./assets/img/player/left/survivor-move_knife_10.png",
			"./assets/img/player/left/survivor-move_knife_11.png",
			"./assets/img/player/left/survivor-move_knife_12.png",
			"./assets/img/player/left/survivor-move_knife_13.png",
			"./assets/img/player/left/survivor-move_knife_14.png",
			"./assets/img/player/left/survivor-move_knife_15.png",
			"./assets/img/player/left/survivor-move_knife_16.png",
			"./assets/img/player/left/survivor-move_knife_17.png",
			"./assets/img/player/left/survivor-move_knife_18.png",
			"./assets/img/player/left/survivor-move_knife_19.png",
		];

		this.sprites_right = [
			"./assets/img/player/right/survivor-move_knife_0.png",
			"./assets/img/player/right/survivor-move_knife_1.png",
			"./assets/img/player/right/survivor-move_knife_2.png",
			"./assets/img/player/right/survivor-move_knife_3.png",
			"./assets/img/player/right/survivor-move_knife_4.png",
			"./assets/img/player/right/survivor-move_knife_5.png",
			"./assets/img/player/right/survivor-move_knife_6.png",
			"./assets/img/player/right/survivor-move_knife_7.png",
			"./assets/img/player/right/survivor-move_knife_8.png",
			"./assets/img/player/right/survivor-move_knife_9.png",
			"./assets/img/player/right/survivor-move_knife_10.png",
			"./assets/img/player/right/survivor-move_knife_11.png",
			"./assets/img/player/right/survivor-move_knife_12.png",
			"./assets/img/player/right/survivor-move_knife_13.png",
			"./assets/img/player/right/survivor-move_knife_14.png",
			"./assets/img/player/right/survivor-move_knife_15.png",
			"./assets/img/player/right/survivor-move_knife_16.png",
			"./assets/img/player/right/survivor-move_knife_17.png",
			"./assets/img/player/right/survivor-move_knife_18.png",
			"./assets/img/player/right/survivor-move_knife_19.png",
		];

		this.sprites_downwards = [
			"./assets/img/player/downwards/survivor-move_knife_0.png",
			"./assets/img/player/downwards/survivor-move_knife_1.png",
			"./assets/img/player/downwards/survivor-move_knife_2.png",
			"./assets/img/player/downwards/survivor-move_knife_3.png",
			"./assets/img/player/downwards/survivor-move_knife_4.png",
			"./assets/img/player/downwards/survivor-move_knife_5.png",
			"./assets/img/player/downwards/survivor-move_knife_6.png",
			"./assets/img/player/downwards/survivor-move_knife_7.png",
			"./assets/img/player/downwards/survivor-move_knife_8.png",
			"./assets/img/player/downwards/survivor-move_knife_9.png",
			"./assets/img/player/downwards/survivor-move_knife_10.png",
			"./assets/img/player/downwards/survivor-move_knife_11.png",
			"./assets/img/player/downwards/survivor-move_knife_12.png",
			"./assets/img/player/downwards/survivor-move_knife_13.png",
			"./assets/img/player/downwards/survivor-move_knife_14.png",
			"./assets/img/player/downwards/survivor-move_knife_15.png",
			"./assets/img/player/downwards/survivor-move_knife_16.png",
			"./assets/img/player/downwards/survivor-move_knife_17.png",
			"./assets/img/player/downwards/survivor-move_knife_18.png",
			"./assets/img/player/downwards/survivor-move_knife_19.png",
		];

	}

	public draw = (ctx: CanvasRenderingContext2D) => {
		
		ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width/1.5,
			this.image.height/1.5
		);

		// bottom wall detection
		this.wallDetection();

		this.movement();

	};

	/**
	 * Function for the player to detect the wall and do not move out from the scope
	 */
	private wallDetection() {
		// Down
		if (this.keyListener.isKeyDown(40) || this.keyListener.isKeyDown(83)) {
			if (
				this.yPos + this.image.height < this.canvas.height * 0.89 ||
				(this.xPos > this.canvas.width * 0.33 &&
					this.xPos + this.image.width < this.canvas.width * 0.49)
			) {
				this.yPos += this.speed;
				this.image = this.loadNewImage(
					this.sprites_downwards[this.counter]
				);
			}
		}
		// Up
		if (this.keyListener.isKeyDown(38) || this.keyListener.isKeyDown(87)) {
			if (
				this.yPos > this.canvas.height * 0.18 ||
				(this.xPos > this.canvas.width * 0.41 &&
					this.xPos + this.image.width < this.canvas.width * 0.59)
			) {
				this.yPos -= this.speed;
				this.image = this.loadNewImage(this.sprites[this.counter]);
			}
		}
		// Left
		if (this.keyListener.isKeyDown(37) || this.keyListener.isKeyDown(65)) {
			if (
				this.xPos > this.canvas.width * 0.24 ||
				(this.yPos + this.image.height > this.canvas.height * 0.63 &&
					this.yPos < this.canvas.height * 0.53)
			) {
				this.xPos -= this.speed;
				this.image = this.loadNewImage(this.sprites_left[this.counter]);
			}
		}
		// Right
		if (this.keyListener.isKeyDown(39) || this.keyListener.isKeyDown(68)) {
			if (
				this.xPos + this.image.width < this.canvas.width * 0.76 ||
				(this.yPos + this.image.height > this.canvas.height * 0.5 &&
					this.yPos < this.canvas.height * 0.35)
			) {
				this.xPos += this.speed;
				this.image = this.loadNewImage(
					this.sprites_right[this.counter]
				);
			}
		}
	}

	/**
	 * Iterating the moving images
	 */
	private movement = () => {
		if (
			this.keyListener.isKeyDown(40) ||
			this.keyListener.isKeyDown(38) ||
			this.keyListener.isKeyDown(37) ||
			this.keyListener.isKeyDown(39) ||
			this.keyListener.isKeyDown(83) ||
			this.keyListener.isKeyDown(87) ||
			this.keyListener.isKeyDown(65) ||
			this.keyListener.isKeyDown(68)
		) {
			this.frameCounter();
		}
	};
	
	
}
