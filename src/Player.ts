/// <reference path="Character.ts" />

class Player extends Character{
	
	constructor(image: string, canvas: HTMLCanvasElement) {
		super(image, canvas);
		this.speed = 5;

		this.sprites = [
			"./assets/img/player/player-0.gif",
			"./assets/img/player/player-1.gif",
			"./assets/img/player/player-2.gif",
			"./assets/img/player/player-3.gif",
			"./assets/img/player/player-4.gif",
			"./assets/img/player/player-5.gif",
		];

		this.sprites_left = [
			"./assets/img/player/left/player-0.gif",
			"./assets/img/player/left/player-1.gif",
			"./assets/img/player/left/player-2.gif",
			"./assets/img/player/left/player-3.gif",
			"./assets/img/player/left/player-4.gif",
			"./assets/img/player/left/player-5.gif",
		];

		this.sprites_right = [
			"./assets/img/player/right/player-0.gif",
			"./assets/img/player/right/player-1.gif",
			"./assets/img/player/right/player-2.gif",
			"./assets/img/player/right/player-3.gif",
			"./assets/img/player/right/player-4.gif",
			"./assets/img/player/right/player-5.gif",
		];

		this.sprites_downwards = [
			"./assets/img/player/downwards/player-0.gif",
			"./assets/img/player/downwards/player-1.gif",
			"./assets/img/player/downwards/player-2.gif",
			"./assets/img/player/downwards/player-3.gif",
			"./assets/img/player/downwards/player-4.gif",
			"./assets/img/player/downwards/player-5.gif",
		];

	}

	public draw = (ctx: CanvasRenderingContext2D) => {
		ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width,
			this.image.height
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
